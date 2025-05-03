from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import When, Case, IntegerField
from rest_framework.generics import ListAPIView

from .pagination import ReviewsPagination
from .bll.get_paginated_response_for_reviews import get_paginated_response_for_reviews
import time

from .models import (
    Category,
    ProductRating,
    ProductReviews
)

from .serializers import (
    CategorySerializer,
    BookPageSerializer,
    ChancelleryPageSerializer,
    ProductRatingSerializer,
    ReviewsSerializer
    )

from django.contrib.contenttypes.models import ContentType

from .views_bll.exceptions import get_type_product

@api_view(http_method_names=['GET'])
def get_categories(request):
    '''Получение всех категорий'''
    
    queryset = Category.objects.prefetch_related('subcats').all()
    serialized_queryset = CategorySerializer(queryset, many=True).data 

    return Response({'status': 'ok', 'comment': 'success', 'result': serialized_queryset})

@api_view(http_method_names=['GET'])
def get_product(request):
    '''Получение продукта для страницы products'''


    id = request.GET.get('id')
    type = request.GET.get('type')

    model_class = get_type_product(type) 

    try: 
        fields = {'subcat', 'discount'}
        
        if type == 'book':
            fields.add('author')
            
        product = model_class \
            .objects \
            .select_related(*fields) \
            .prefetch_related('ancillary_images') \
            .get(id=id)
            
    except Exception:
        return Response({'status': 'error', 'comment': 'product doesn\t exists'}, status=400)

    if type == 'book':
        serialized_product = BookPageSerializer(product).data
    if type == 'chancellery':
        serialized_product = ChancelleryPageSerializer(product).data

    assessments = ProductRating.objects.filter(object_id=id)
    serialized_assessments = ProductRatingSerializer(assessments, many=True).data

    if request.user.is_authenticated:
        queryset = ProductReviews.objects.filter(object_id=id).order_by(
        Case(
            When(user_id=request.user.id, then=0),  
            default=1,  
            output_field=IntegerField()
        ), '-date_add' )
    else:
        queryset = ProductReviews.objects.filter(object_id=id).order_by('-date_add')
        
    serialized_reviews = get_paginated_response_for_reviews(queryset=queryset, request=request).data

    return Response({
        'status': 'ok', 
        'comment': 'success', 
        'result': serialized_product,
        'assessments': serialized_assessments,
        'user_id': str(request.user.id),
        'reviews': serialized_reviews
        })

@api_view(http_method_names=['POST'])
def post_assessment(request):
    '''Оценка продукта'''
    
    if request.user.is_authenticated:
        rate = request.data.get('rate') 
        type = request.data.get('type')
        product_id = request.data.get('product_id')
        
        model_class = get_type_product(type)

        rating, created = ProductRating.objects.get_or_create(
            object_id=product_id,
            user=request.user,
            content_type=ContentType.objects.get_for_model(model_class))

        if rate == 'null':
            rating.delete()
            assessments = ProductRating.objects.filter(object_id=product_id)
            serialized_assessments = ProductRatingSerializer(assessments, many=True).data
            
            response = {
            'status': 'ok', 
            'comment': 'success',
            'assessments': serialized_assessments,
            }
            return Response(response)

        rating.rate = rate
        rating.save()

        assessments = ProductRating.objects.filter(object_id=product_id)
        serialized_assessments = ProductRatingSerializer(assessments, many=True).data
        
        response = {
        'status': 'ok', 
        'comment': 'success',
        'assessments': serialized_assessments,
        'user_id': str(request.user.id),
        }

        return Response(response)
        
    return Response({'status': 'error', 'comment': 'User is not authenticated'}, status=400)

@api_view(http_method_names=['POST'])
def post_review(request):
    '''Отзыв продукта'''
    
    if request.user.is_authenticated:
        value = request.data.get('value')
        product_id = request.data.get('product_id')

        review, created = ProductReviews.objects.get_or_create(
            user=request.user,
            object_id=product_id
        )   

        if not created:
            return Response({'status': 'error', 'comment': 'product has a review from this user'}, status=401)
        
        review.review = value
        review.save()

        serialized_review = ReviewsSerializer(review).data
        
        return Response({'status': 'ok', 'comment': 'success', 'review': serialized_review })
        
    return Response({'status': 'error', 'comment': 'User is not authenticated'}, status=400)

@api_view(http_method_names=['DELETE'])
def review_delete(request):
    '''Удаление отзыва'''

    product_id = request.data.get('product_id')
    review_id = request.data.get('review_id')
  
    try:
        obj = ProductReviews.objects.get(user=request.user.id, object_id=product_id, id=review_id) 
    except Exception:
        return Response({'status': 'error', 'comment': 'there is not such a comment'}, status=400)
    
    obj.delete()
    
    return Response({'status': 'ok', 'comment': 'success', 'review_id': review_id})

@api_view(http_method_names=['PUT'])
def update_review(request):
    '''Редактирование отзыва'''

    product_id = request.data.get('product_id')
    review_id = request.data.get('review_id')
    review = request.data.get('review')
    
    try:
        obj = ProductReviews.objects.get(user=request.user.id, object_id=product_id, id=review_id) 
    except Exception:
        return Response({'status': 'error', 'comment': 'there is not such a comment'}, status=400)
    
    obj.review = review
    obj.is_changed = True
    obj.save()

    return Response({'status': 'ok', 'comment': 'succesful', 'review': ReviewsSerializer(obj).data})

class ReviewsApiList(ListAPIView):
    '''Возвращает пагинированные отзывы'''
    
    pagination_class = ReviewsPagination
    serializer_class = ReviewsSerializer
    
    def get(self, request):
        product_id = request.query_params.get('product_id') 
        queryset = ProductReviews.objects.select_related('user').filter(object_id=product_id).order_by('-date_add')
        serialized_data = get_paginated_response_for_reviews(
                queryset=queryset, 
                request=request).data
        return Response({
            'status': 'ok',
            'comment': 'success',
            'data': serialized_data,
            })