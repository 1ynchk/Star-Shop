from django.urls import path 

from .views import (
    get_categories,
    get_product,
    post_assessment
    )

urlpatterns = [
    path('get-categories/', get_categories, name='categories'),
    path('get-product/', get_product, name='product'),
    path('post-assessment/', post_assessment, name='post-assessment') 
]