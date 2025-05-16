from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from api_favorite.models import Favorite

from api_products.models import Products
from api_users.models import Users
from api_users.serializers import (
    UserProfileSerializer,
    UserProfileUpdateSerializer
    )
from api_products.bll.product_page import (get_all_types)
from .bll.favorite_page import (
    get_type_serializer,
    get_favorite_queryset
    )
from api_favorite.serializers import FavoriteSerializer
import time

class FavoriteList(ListAPIView):
    '''Возвращает избранные продукты пользователя'''
    
    def list(self, request):
       
        favorites = Favorite.objects.filter(user=request.user)
        products_id = [obj.object_id for obj in favorites]
        data = []
        
        response = {
            'status': 'ok', 
            'comment': 'success', 
            'result': {}} 
        
        for type in get_all_types():
            queryset = get_favorite_queryset(type, request, products_id) 
            serialized_queryset = get_type_serializer(type, queryset)
            data += serialized_queryset
    
        response['result']['data'] = data
                
        if request.user.is_authenticated:
            serialized_favorite = FavoriteSerializer(favorites, many=True).data
            response['result']['favorite'] = serialized_favorite

        return Response(response)
            
                

@api_view(http_method_names=['GET'])
def get_profile_info(request):
    '''Возвращает информацию о пользователе'''        

    if (request.user.is_authenticated):
        try:
            user = Users.objects.get(id=request.user.id)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a user'})
        serialized_user = UserProfileSerializer(user).data
        return Response({'status': 'ok', 'comment': 'status', 'data': serialized_user}) 
    
    return Response({'status': 'error', 'comment': 'unathorized'}, status=403)

@api_view(http_method_names=['POST'])
def edit_profile_info(request): 
    '''Обновление информации пользователя'''

    if (request.user.is_authenticated):
        try:
            user = Users.objects.get(id=request.user.id)
        except Exception:
            return Response({'status': 'error', 'comment': 'there is not such a user'})
        serialized_obj = UserProfileUpdateSerializer(data=request.data, instance=user)
        if serialized_obj.is_valid():
            serialized_obj.save()
            return Response({'status': 'ok', 'comment': 'success', 'data': serialized_obj.data})
        else:
            return Response({'status': 'error', 'comment': 'serialized object is not valid'}, status=400)
        
    return Response({'status': 'error', 'comment': 'unathorized'}, status=403)
