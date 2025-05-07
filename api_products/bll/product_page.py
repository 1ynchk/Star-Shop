from rest_framework.response import Response
from django.apps import apps
from django.db.models import Model, QuerySet
from rest_framework.serializers import ModelSerializer
import ulid
from typing import TypeVar, Union

from ..models import Products
from ..serializers import (
    BookPageSerializer,
    ChancelleryPageSerializer
)

ProductModel = TypeVar('ProductModel', bound=Model)

def get_all_types() -> list:
    '''Возвращает все типы абстрактной модели Products'''
    return [obj[0] for obj in Products.type_product]

def get_type_product(type: str) -> Model:
    '''Возвращает класс модели'''

    if type not in get_all_types():
        return Response({'status': 'error', 'comment': 'type doens\t exists'}, status=400)
    model_class = apps.get_model('api_products', type)
    return model_class
    
def get_type_serializer(type: str, product: ProductModel) -> Union[Response, ModelSerializer]:
    '''Возвращает сериализованный продукт для страницы продукта'''
    
    if type not in get_all_types():
        return Response({'status': 'error', 'comment': 'type doens\t exists'}, status=400)
   
    if type == 'book':
        return BookPageSerializer(product).data
    if type == 'chancellery':
        return ChancelleryPageSerializer(product).data
    
def get_queryset_product_page(type: str, model_class: Model, id: ulid) -> Union[Response, ProductModel]:
    '''Возвращает queryset для представления get_product()'''
    
    try: 
        fields = {'subcat', 'discount'}
        if type == 'book':
            fields.add('author')
        product = model_class \
            .objects \
            .select_related(*fields) \
            .prefetch_related('ancillary_images') \
            .get(id=id)
            
        return product
    except Exception:
        return Response({'status': 'error', 'comment': 'product doesn\t exists'}, status=400)
    