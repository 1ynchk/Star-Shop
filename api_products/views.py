from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Category
from .serializers import CateforySerializer

# Create your views here.
@api_view(http_method_names=['GET'])
def get_categories(request):
    '''Получение всех категорий'''
    
    queryset = Category.objects.prefetch_related('subcats').all()
    serialized_queryset = CateforySerializer(queryset, many=True).data 

    return Response({'status': 'ok', 'comment': 'success', 'result': serialized_queryset})