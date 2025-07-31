from django.urls import path

from .views import (
   add_to_cart,
   get_user_cart
)

urlpatterns = [
   path('add-to-cart/', add_to_cart, name='add-to-cart'),
   path('get-user-cart/', get_user_cart, name='get-user-cart') 
]