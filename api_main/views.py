from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Banner, MainCategories
from .serializers import (
    BannerSerializer,
    MainCategoriesSerializer
)

# Create your views here.
@api_view(http_method_names=['GET'])
def get_main_categories(request): 
    '''Получение категорий для хедера''' 
    
    queryset = MainCategories.objects.select_related('cat').all()
    serialiezed_queryset = MainCategoriesSerializer(queryset, many=True).data

    return Response({'status': 'ok', 'comment': 'success', 'result': serialiezed_queryset})
   
@api_view(http_method_names=['GET'])
def get_banners(request):
    '''Получение фотографии для главной страницы''' 
    
    queryset = Banner.objects.all()
    serialized_queryset = BannerSerializer(queryset, many=True).data
    
    return Response({'status': 'ok', 'comment': 'success', 'result': serialized_queryset}) 