from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api_products.bll.product_page import get_type_product
from django.contrib.contenttypes.models import ContentType
from .serializers import CartSerializer 
from .models import Cart

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
    
    