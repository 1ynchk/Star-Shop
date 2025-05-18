from rest_framework import serializers

from .models import Cart
from api_users.serializers import UserSerializer

class CartSerializer(serializers.ModelSerializer):
    '''Сериализатор для корзины'''

    user = UserSerializer()
    
    class Meta:
        model = Cart
        fields = '__all__'