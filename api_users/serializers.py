from rest_framework import serializers

from .models import Users

class UserSerializer(serializers.ModelSerializer):
    '''Сериализатор для пользователей'''
    
    class Meta:
        model = Users
        fields = ['id']
        
class UserProfileSerializer(serializers.ModelSerializer):
    '''Сериализатор для профиля пользователей'''
    
    class Meta: 
        model = Users
        fields = ['name', 'surname', 'email']
        
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    '''Сериализатор для редактировании профиля пользователя'''
    
    class Meta:
        model = Users
        fields = ['name', 'surname', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'last_name': {'required': False},
            'first_name': {'required': False},
            'email': {'required': False},
        }

    def update(self, instance, validate_data):
        password = validate_data.get('password', None)
        for attr, value in validate_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance