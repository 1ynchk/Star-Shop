from django.db import models
from django.contrib.auth.models import AbstractUser
from django_ulid.models import default, ULIDField

class Users(AbstractUser):
    '''Модель юзера'''
    
    id = ULIDField(default=default, primary_key=True, editable=False)
    email = models.CharField(null=False, unique=True)
    avatar = models.CharField(default='https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg')
    name = models.CharField(default='Анонимный', max_length=155)
    surname = models.CharField(default='Пользователь', max_length=155)
    username = models.CharField(unique=False, null=True, blank=True)
    last_name = None 
    first_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'api_users'

class Favourite(models.Model):
    '''Модель избранного'''

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey('api_products.Products', on_delete=models.CASCADE)

    class Meta:
        db_table = 'api_favourite'

    def __str__(self):
        return f'{self.user} | {self.product}'
    
class Cart(models.Model):
    '''Модель корзины'''
    
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    product = models.ForeignKey('api_products.Products', on_delete=models.CASCADE)

    class Meta: 
        db_table = 'api_cart'

    def __str__(self):
        return f'{self.user} | {self.product}'