from rest_framework import serializers

from .models import Users

class UserSerializer(serializers.ModelSerializer):
    '''Сериализатор для пользователей'''
    
    class Meta:
        model = Users
        fields = ['id']