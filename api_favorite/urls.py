from django.urls import path

from .views import (
    add_to_favorite
)

urlpatterns = [
    path('add-to-favorite/', add_to_favorite, name='add-to-favorite')
]