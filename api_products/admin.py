from django.contrib import admin

from .models import Chancellery, Book, Category, Subcategory

# Register your models here.

class CommonProductsAdminClass(admin.ModelAdmin):
    '''
        Общие настройки для админ классов приложения 
    '''
    
    list_per_page = 20

@admin.register(Chancellery)
class AdminChancellery(CommonProductsAdminClass):
    '''Админ панель канцелярии'''
    pass

@admin.register(Book)
class AdminBook(CommonProductsAdminClass):
    '''Админ панель книг'''
    
    pass

@admin.register(Subcategory)
class AdminSubcategory(CommonProductsAdminClass):
    '''Админ панель подкатегорий'''
    
@admin.register(Category)
class AdminCategory(CommonProductsAdminClass):
    '''Админ панель категорий''' 