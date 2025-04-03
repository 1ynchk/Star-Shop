from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics

from api_products.models import Chancellery, Book
from .models import Banner, MainCategories
from .serializers import (
    BannerSerializer,
    MainCategoriesSerializer,
)

from api_products.serializers import  (
    ChancelleryMainPageSerializer,
    BookMainPageSerializer
)

# Create your views here.
@api_view(http_method_names=['GET'])
def get_main_categories(request): 
    '''Получение категорий для хедера''' 
    
    queryset = MainCategories.objects.select_related('cat').all()
    serialiezed_queryset = MainCategoriesSerializer(queryset, many=True).data

    return Response({'status': 'ok', 'comment': 'success', 'result': serialiezed_queryset})
   
@api_view(http_method_names=['GET'])
def get_first_section(request):
    '''Получение фотографии для главной страницы''' 

    queryset_banners = Banner.objects.all()
    queryset_chancellery = Chancellery.objects.all().order_by('-date_add')[:15]
    queryset_book = Book.objects.select_related('author').all().order_by('-date_add')[:15] 
    serialized_banners = BannerSerializer(queryset_banners, many=True).data
    serialized_chancellery = ChancelleryMainPageSerializer(queryset_chancellery, many=True).data
    serialized_book = BookMainPageSerializer(queryset_book, many=True).data 
    
    return Response({
        'status': 'ok', 
        'comment': 'success', 
        'result': {
            'banners': serialized_banners,
            'books': serialized_book,
            'chancellery': serialized_chancellery   
        }
        }) 

