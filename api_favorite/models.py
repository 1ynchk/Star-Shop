from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey

class Favorite(models.Model):
    '''Модель избранного'''

    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    object_id = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'api_favourite'

    def __str__(self):
        return f'{self.user} | {self.object_id}'
