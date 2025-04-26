from django.contrib import admin

from .models import Banner, MainCategories

# Register your models here.
@admin.register(Banner)
class AdminBanner(admin.ModelAdmin):
    '''Админ панель для банеров главного меню'''
    
@admin.register(MainCategories)
class AdminMainCategories(admin.ModelAdmin):
    '''Админ панель для категорий главного меню'''