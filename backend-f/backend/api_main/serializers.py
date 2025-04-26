from rest_framework import serializers

from .models import MainCategories, Banner

from api_products.serializers import CategorySerializerReduced

class MainCategoriesSerializer(serializers.ModelSerializer):
    '''Сериализатор для категорий хедера'''

    cat = CategorySerializerReduced()

    class Meta:
        model = MainCategories
        fields = '__all__'
        
class BannerSerializer(serializers.ModelSerializer):
    '''Сериализатор для баннеров'''
    
    class Meta:
        model = Banner
        fields = '__all__'