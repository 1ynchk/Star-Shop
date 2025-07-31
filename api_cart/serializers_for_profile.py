from rest_framework import serializers

from api_products.serializers import BookSerializer, ChancellerySerializer
from api_products.models import Book, Chancellery
from .models import Cart

class CartProfileSerializer(serializers.ModelSerializer):
    content_object = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'user', 'content_type', 'object_id', 'content_object']
    
    def get_content_object(self, obj):
        product = obj.content_object
        
        if isinstance(product, Book):
            return BookSerializer(product).data
        elif isinstance(product, Chancellery):
            return ChancellerySerializer(product).data
        return None