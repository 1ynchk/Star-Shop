from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Favorite(models.Model):
    '''Модель избранного'''

    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField()  # ID связанного объекта
    content_object = GenericForeignKey('content_type', 'object_id') 
    
    class Meta:
        db_table = 'api_favourite'

    def __str__(self):
        return f'{self.user} | {self.object_id}'
