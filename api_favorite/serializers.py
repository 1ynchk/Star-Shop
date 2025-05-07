from rest_framework import serializers
from .models import Favorite

from api_products.serializers import ProductUserReviewSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    '''Сериализатор для таблицы избранного'''

    user = ProductUserReviewSerializer()
    
    class Meta:
        model = Favorite
        fields = '__all__'