from django.db import models

# Create your models here.
class Banner(models.Model):
    '''Таблица для банеров главного меню'''
    
    tag = models.CharField(max_length=100)
    image = models.FileField(upload_to='media/mainpage/', default='media/default/main-banner-default.png')
    url = models.URLField(null=True)
    
    def __str__(self):
        return self.tag
    
    def save(self, *args, **kwargs):
        '''Максимальное кол-во объектов - 10'''
        
        if self.__class__.objects.count() < 11:
            super().save(*args, **kwargs)

class MainCategories(models.Model):
    '''Таблица для категорий в хедере''' 
    
    cat = models.ForeignKey('api_products.Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.cat.name
    
    def save(self, *args, **kwargs):
        '''Максимальное кол-во объектов - 5'''
        
        if self.__class__.objects.count() < 6:
            super().save(*args, **kwargs)