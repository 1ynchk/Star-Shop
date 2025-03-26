from django.urls import path 

from .views import get_categories

urlpatterns = [
    path('get-categories/', get_categories, name='categories') 
]