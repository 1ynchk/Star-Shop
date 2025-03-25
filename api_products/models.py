from django.db import models
from django_ulid.models import default, ULIDField
from django.db import models

from django_ulid.models import default, ULIDField

class Products(models.Model):
    '''
        Абстрактная модель продуктов, 
        от которой наследуются различные типы продуктов
    '''
    
    id = ULIDField(default=default, primary_key=True, editable=False) 
    name = models.CharField(max_length=100, null=False) 
    desc = models.CharField(max_length=564, null=True)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    articul = models.CharField(unique=True, max_length=50)
    main_image = models.FileField(
        upload_to='media/products/', 
        default='media/default/product-default.png')
    ancillary_images = models.ManyToManyField('ProductImages')
    subcat = models.ForeignKey('Subcategory', on_delete=models.SET_NULL, null=True)
    date_add = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name 
    
    class Meta:
        abstract = True

class ProductImages(models.Model):
    '''Таблица для фотографий продукта''' 
    
    image = models.FileField(null=False, upload_to='media/products/')
 
class Subcategory(models.Model):
    '''Подкатегории товаров'''
    
    id = ULIDField(default=default, editable=False, primary_key=True) 
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Category(models.Model):
    '''Таблица для категорий продуктов'''
    
    id = ULIDField(default=default, primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    subcats = models.ManyToManyField('Subcategory')
    
    def __str__(self):
        return self.name

class Chancellery(Products):
    '''Таблица для канцелярии'''
    
    pass 

class Book(Products):
    '''Таблица для книг'''
    
    binding_choices = [
        ('Т', 'Твердый'), 
        ('М', 'Мягкий')
    ]

    author = models.ForeignKey('Author', on_delete=models.SET_NULL, null=True)     
    publisher = models.CharField(max_length=155)
    series = models.CharField(max_length=155, blank=True, null=True)
    binding = models.CharField(max_length=155, choices=binding_choices)
    pub_year = models.IntegerField()
    count_pages = models.IntegerField() 

    class Meta:
        db_table = 'api_books'

class Author(models.Model):
    '''Таблица для авторов книг'''
    
    id = ULIDField(default=default, primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Publisher(models.Model):
    '''Таблица для книжного издателя'''
    
    id = ULIDField(default=default, primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
