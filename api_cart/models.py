from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class Cart(models.Model):
    '''Таблица для корзины пользователя'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    def __str__(self):
        return f'{self.user} | {self.object_id}'