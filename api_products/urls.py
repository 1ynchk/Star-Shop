from django.urls import path 

from .views import (
    get_categories,
    get_product
    )

urlpatterns = [
    path('get-categories/', get_categories, name='categories'),
    path('get-product/', get_product, name='product') 
]