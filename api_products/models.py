from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django_ulid.models import default, ULIDField

from django_ulid.models import default, ULIDField

class Products(models.Model):
    '''
        Абстрактная модель продуктов, 
        от которой наследуются различные типы продуктов
    '''

    type_product = (
        ('book', 'Книги'),
        ('chancellery', 'Канцелярия')
    )
    
    id = ULIDField(default=default, primary_key=True, editable=False) 
    name = models.CharField(max_length=100, null=False) 
    desc = models.CharField(max_length=564, null=True)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    articul = models.CharField(unique=True, max_length=50)
    main_image = models.FileField(
        upload_to='media/products/', 
        default='media/default/product-default.png')
    discount = models.ForeignKey('ProductDiscount', blank=True, null=True, on_delete=models.SET_NULL)
    ancillary_images = models.ManyToManyField('ProductImages', blank=True)
    subcat = models.ForeignKey('Subcategory', on_delete=models.SET_NULL, null=True)
    amount = models.IntegerField(null=False)
    date_add = models.DateField(auto_now_add=True)
    content_type = models.CharField(choices=type_product)
    ratings = GenericRelation(
        'ProductRating', 
        object_id_field='object_id', 
        content_type_field='content_type')
    reviews = GenericRelation(
        'ProductReviews',
        object_id_field='objects_id' 
    )
    favorite = GenericRelation(
        'api_favorite.Favorite',
        object_id_field='object_id',
        content_type_field='content_type' 
    )
    cart = GenericRelation(
        'api_cart.Cart',
        object_id_field='object_id',
        content_type_field='content_type'
    )

    def __str__(self):
        return self.name 
    
    class Meta:
        abstract = True

class ProductReviews(models.Model):
    '''Таблица для отзывов'''
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)    
    object_id = models.CharField(max_length=100)
    review = models.CharField(max_length=2000)
    is_changed = models.BooleanField(default=False)
    date_add = models.DateField(auto_now_add=True)
    
    def str(self):
        return f'{self.user.email} | {self.object_id.name}' 

class ProductDiscount(models.Model):
    '''Таблица для скидок продуктов'''
   
    name = models.CharField(max_length=100) 
    price_with_discount = models.DecimalField(max_digits=3, decimal_places=2)
    date_start = models.DateField()
    date_end = models.DateField()
    
    def __str__(self):
        return self.name

class ProductRating(models.Model):
    '''Единая таблица для оценок всех продуктов'''
    
    rate_choices = [
        ('like', 'Нравится'),
        ('dislike', 'Не нравится')
    ]
    
    user = models.ForeignKey('api_users.Users', on_delete=models.CASCADE)
    rate = models.CharField(max_length=50, choices=rate_choices)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField(max_length=50)  
    content_object = GenericForeignKey('content_type', 'object_id')
    
    def __str__(self):
        return f'{self.content_object.name} | {self.user.email}'

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

    def save(self, *args, **kwargs):
        self.content_type = 'chancellery'
        super().save(*args, **kwargs)

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

    def save(self, *args, **kwargs):
        self.content_type = 'book'
        super().save(*args, **kwargs)

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
    
