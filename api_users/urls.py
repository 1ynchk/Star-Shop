from django.urls import path 

from .views import (
    check_login,
    registration
)

urlpatterns = [
   path('check-login/', check_login, name='check-login'),
   path('registration/', registration, name='registration')
]