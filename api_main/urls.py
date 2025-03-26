from django.urls import path 

from .views import (
    get_main_categories,
    get_banners
    )

urlpatterns = [
    path('get-main-categories/', get_main_categories, name='main-categories'),
    path('get-banners/', get_banners, name='get-banners')
]