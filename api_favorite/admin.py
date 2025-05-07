from django.contrib import admin
from .models import Favorite

# Register your models here.
@admin.register(Favorite)
class AdminFavorite(admin.ModelAdmin):
    '''Админ панель для избранного'''