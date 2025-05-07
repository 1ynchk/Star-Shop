from rest_framework.response import Response
from django.db.models import QuerySet
from rest_framework.serializers import ModelSerializer
from typing import Union
from api_products.serializers import (
    ChancelleryMainPageSerializer,
    BookMainPageSerializer
)
from api_products.bll.product_page import (get_type_product)

def get_type_serializer(type: str, queryset: QuerySet) -> Union[Response, ModelSerializer]:
    '''Возвращает сериализованный продукт для страницы продукта'''

    if type == 'book':
        return BookMainPageSerializer(queryset, many=True).data
    if type == 'chancellery':
        return ChancelleryMainPageSerializer(queryset, many=True).data
    
def get_favorite_queryset(type: str, products_id: list) -> QuerySet:
    '''Возвращает queryset для страницы избранного'''
    
    model_class = get_type_product(type)
    
    if type == 'book':
        queryset = model_class.objects.select_related('author', 'discount').filter(id__in=products_id)
    if type == 'chancellery':
        queryset = model_class.objects.select_related('discount').filter(id__in=products_id)

    return queryset