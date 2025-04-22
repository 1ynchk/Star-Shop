from django.urls import path 

from .views import (
    get_categories,
    get_product,
    post_assessment,
    post_review
    )

urlpatterns = [
    path('get-categories/', get_categories, name='categories'),
    path('get-product/', get_product, name='product'),
    path('post-assessment/', post_assessment, name='post-assessment'),
    path('post-review/', post_review, name='post-review') 
]