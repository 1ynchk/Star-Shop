from django.urls import path 

from .views import (
    get_categories,
    get_product,
    post_assessment,
    post_review,
    review_delete,
    update_review,
    ReviewsApiList
    )

urlpatterns = [
    path('get-categories/', get_categories, name='categories'),
    path('get-product/', get_product, name='product'),
    path('post-assessment/', post_assessment, name='post-assessment'),
    path('post-review/', post_review, name='post-review'),
    path('delete-review/', review_delete, name='delete-review'),
    path('update-review/', update_review, name='update-review'),
    path('paginated-reviews/', ReviewsApiList.as_view(), name='paginated-reviews') 
]