from rest_framework import serializers

from .models import (
    Category, 
    Subcategory,
    Chancellery,
    Book
    )

class CategorySerializerReduced(serializers.ModelSerializer):
    '''Сериализатор для категорий без подкатегорий'''
    
    class Meta: 
        model = Category
        fields = ['id', 'name']
        
class SubcategorySerializer(serializers.ModelSerializer):
    '''Сериализатор для подкатегорий'''
    
    class Meta:
        model = Subcategory
        fields = '__all__'
        
class CateforySerializer(serializers.ModelSerializer):
    '''Сериализатор для категорий'''

    subcats = SubcategorySerializer(many=True)

    class Meta:
        model = Category
        fields = '__all__'       

class CommonMainPageProducts(serializers.ModelSerializer):
    '''Общий сериализатор для продуктов главной страницы'''

    class Meta:
        model = Chancellery
        fields = ['id', 'name', 'price', 'main_image']