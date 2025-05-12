from rest_framework import serializers
from .models import Favorite

from api_users.serializers import UserSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    '''Сериализатор для таблицы избранного'''

    user = UserSerializer()
    
    class Meta:
        model = Favorite
        fields = '__all__'