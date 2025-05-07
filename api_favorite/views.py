from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Favorite
from .serializers import FavoriteSerializer

@api_view(http_method_names=['POST'])
def add_to_favorite(request):
    '''Добавление в избранное'''

    product_id = request.data.get('product_id')

    obj, created = Favorite.objects.get_or_create(user=request.user, object_id=product_id) 

    if not created:
        obj.delete()

    serialized_obj = FavoriteSerializer(obj).data if created else None 
    
    return Response({'status': 'ok', 'comment': 'success', 'data': serialized_obj})
    
        