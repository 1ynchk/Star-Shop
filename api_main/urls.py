from django.urls import path 

from .views import (
    get_main_categories,
    get_first_section,
    )

urlpatterns = [
    path('get-main-categories/', get_main_categories, name='main-categories'),
    path('get-first-section/', get_first_section, name='get-first-section'),
]