from django.db.models import Prefetch
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api_products.models import Chancellery, Book
from .models import Banner, MainCategories
from .serializers import (
    BannerSerializer,
    MainCategoriesSerializer,
)

import time

from api_products.serializers import  (
    ChancelleryMainPageSerializer,
    BookMainPageSerializer
)

from api_favorite.models import Favorite

# Create your views here.
@api_view(http_method_names=['GET'])
def get_main_categories(request): 
    '''Получение категорий для хедера''' 
     
    queryset = MainCategories.objects.select_related('cat').all()
    serialiezed_queryset = MainCategoriesSerializer(queryset, many=True).data

    return Response({'status': 'ok', 'comment': 'success', 'result': serialiezed_queryset})
   
@api_view(http_method_names=['GET'])
def get_first_section(request):
    '''Первой секции для главной страницы''' 

    queryset_banners = Banner.objects.all()
    
    if request.user.is_authenticated: 
        queryset_chancellery = Chancellery.objects \
        .prefetch_related(Prefetch(
            'favorite', 
            queryset=Favorite.objects.filter(user=request.user), 
            to_attr='user_favorite')) \
        .select_related('discount').all().order_by('-date_add')[:15]
        queryset_book = Book.objects \
        .prefetch_related(
            Prefetch(
                'favorite', 
                queryset=Favorite.objects.filter(user=request.user), 
                to_attr='user_favorite')
            ) \
        .select_related('author', 'discount').all().order_by('-date_add')[:15] 
    else: 
        queryset_chancellery = Chancellery.objects \
        .prefetch_related(Prefetch(
            'favorite', 
            queryset=Favorite.objects.none(), 
            to_attr='user_favorite')) \
        .select_related('discount').all().order_by('-date_add')[:15]
        queryset_book = Book.objects \
        .prefetch_related(
            Prefetch(
                'favorite', 
                queryset=Favorite.objects.none(), 
                to_attr='user_favorite')
            ) \
        .select_related('author', 'discount').all().order_by('-date_add')[:15] 
    serialized_banners = BannerSerializer(queryset_banners, many=True).data
    serialized_chancellery = ChancelleryMainPageSerializer(queryset_chancellery, many=True).data
    serialized_book = BookMainPageSerializer(queryset_book, many=True).data 

    response = {
        'status': 'ok', 
        'comment': 'success', 
        'result': {
            'banners': serialized_banners,
            'book': serialized_book,
            'chancellery': serialized_chancellery   
        }}

    return Response(response) 

