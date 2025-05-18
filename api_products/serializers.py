from rest_framework import serializers

from .models import (
    Category, 
    Subcategory,
    Chancellery,
    Book,
    Author,
    ProductImages,
    ProductRating,
    ProductDiscount,
    ProductReviews
    )

from api_users.models import Users

from api_users.serializers import UserSerializer
from api_favorite.serializers import FavoriteSerializer
from api_cart.serializers import CartSerializer

class ProductUserReviewSerializer(serializers.ModelSerializer):
    '''Сериализатор для пользовательского отзыва'''
    
    class Meta:
        model = Users
        fields = ['name', 'surname', 'id', 'avatar']

class ProductDiscountSerializer(serializers.ModelSerializer):
    '''Сериализатор для скидок продукта'''
    
    class Meta:
        model = ProductDiscount
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    '''Сериализатор для авторов книг'''
    
    class Meta: 
        model = Author
        fields = '__all__'

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
        
class CategorySerializer(serializers.ModelSerializer):
    '''Сериализатор для категорий'''

    subcats = SubcategorySerializer(many=True)

    class Meta:
        model = Category
        fields = '__all__'       

class ChancelleryMainPageSerializer(serializers.ModelSerializer):
    '''Сериализатор для канцелярии главной страницы'''

    discount = ProductDiscountSerializer()
    user_favorite = FavoriteSerializer(many=True)

    class Meta:
        model = Chancellery
        fields = ['id', 'name', 'price', 'main_image', 'content_type', 'discount', 'user_favorite']

class BookMainPageSerializer(serializers.ModelSerializer):
    '''Сериализатор для книг в главном меню'''

    author = AuthorSerializer()
    discount = ProductDiscountSerializer()
    user_favorite = FavoriteSerializer(many=True)
    
    class Meta: 
        model = Book 
        fields = ['id', 'name', 'price', 'main_image', 'content_type', 'author', 'discount', 'user_favorite']

class ProductImagesSerializer(serializers.ModelSerializer):
    '''Сериализатор дополнительных фотографий продуктов'''
    
    class Meta: 
        model = ProductImages
        fields = ['image']
        
class BookPageSerializer(serializers.ModelSerializer):
    '''Сериализатор для страницы с книгой'''

    subcat = SubcategorySerializer()
    author = AuthorSerializer()
    ancillary_images = ProductImagesSerializer(many=True)
    discount = ProductDiscountSerializer()
    user_favorite = FavoriteSerializer(many=True)
    user_cart = CartSerializer(many=True)
    
    class Meta:
        model = Book 
        fields ='__all__'
        
class ChancelleryPageSerializer(serializers.ModelSerializer):
    '''Сериализатор для страницы с канцелярией'''

    subcat = SubcategorySerializer()
    ancillary_images = ProductImagesSerializer(many=True)
    discount = ProductDiscountSerializer()
    user_favorite = FavoriteSerializer(many=True)
    user_cart = CartSerializer(many=True)
    
    class Meta:
        model = Chancellery
        fields = '__all__'
        
class ProductRatingSerializer(serializers.ModelSerializer):
    '''Сериализатор для оценок пользователя'''

    user = UserSerializer()
    
    class Meta:
        model = ProductRating
        fields = ['rate', 'user']
        
class ReviewsSerializer(serializers.ModelSerializer):
    '''Сериализатор для отзывов пользователей'''

    user = ProductUserReviewSerializer()
    
    class Meta:
        model = ProductReviews
        fields = '__all__'