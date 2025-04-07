from django.contrib import admin

from .models import (
    Chancellery, 
    Book, 
    Category, 
    Subcategory,
    ProductImages,
    Author
)

# Register your models here.

class CommonProductsAdminClass(admin.ModelAdmin):
    '''
        Общие настройки для админ классов приложения 
    '''
    
    list_per_page = 20

@admin.register(Chancellery)
class AdminChancellery(CommonProductsAdminClass):
    '''Админ панель канцелярии'''

@admin.register(Author)
class AdminAuthor(CommonProductsAdminClass):
    '''Админ панель авторов'''

@admin.register(Book)
class AdminBook(CommonProductsAdminClass):
    '''Админ панель книг'''

@admin.register(Subcategory)
class AdminSubcategory(CommonProductsAdminClass):
    '''Админ панель подкатегорий'''
    
@admin.register(Category)
class AdminCategory(CommonProductsAdminClass):
    '''Админ панель категорий''' 
    
@admin.register(ProductImages)
class AdminProductsImages(CommonProductsAdminClass):
    '''Админ панель дополнительных фотографий для продуктов'''
    