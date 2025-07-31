from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api_products.bll.product_page import get_type_product
from django.contrib.contenttypes.models import ContentType
from .serializers import CartSerializer 
from .serializers_for_profile import CartProfileSerializer
from .models import Cart
from api_users.models import Users

@api_view(http_method_names=['POST'])
def add_to_cart(request):
    '''Добавление в корзину'''
    
    product_id = request.data.get('product_id')
    type = request.data.get('type')
    
    model_class = get_type_product(type)
    content_type = ContentType.objects.get_for_model(model_class)
    
    obj, created = Cart.objects.get_or_create(
        user=request.user, 
        object_id=product_id, 
        content_type=content_type
    )
    
    if not created:
        obj.delete()
        
    serialized_obj = CartSerializer(obj).data if created else None
    
    return Response({
        'status': 'ok', 
        'comment': 'success', 
        'data': serialized_obj,
        'product_id': product_id
        })
    
@api_view(["GET"]) 
def get_user_cart(request):
    '''Возвращает корзину пользователя'''

    if request.user.is_authenticated:
        try:
            user = Users.objects.get(id=request.user.id)
        except Exception:
            return Response({'status': 'error', 'comment': 'There is not such a user. Unathorized user'}, status=400)

        cart_objects = Cart.objects.filter(user=user)

        serialized_cart_objects = CartProfileSerializer(cart_objects, many=True).data

        return Response(
            {
                'status': 'ok', 
                'comment': 'success',
                'data': [
                        
                ]
            }
        )


    return Response({'status': 'error', 'comment': 'Unathorized request'}, status=400)