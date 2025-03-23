from django.urls import path 

from .views import (
    check_login,
    registration,
    user_login,
    user_logout
)

urlpatterns = [
   path('check-login/', check_login, name='check-login'),
   path('registration/', registration, name='registration'),
   path('login/', user_login, name='login'),
   path('logout/', user_logout, name='logout'),
]