from django.urls import path 

from .views import (
    check_login,
    registration,
    user_login,
    user_logout,
    get_profile_info,
    edit_profile_info
)

urlpatterns = [
   path('check-login/', check_login, name='check-login'),
   path('registration/', registration, name='registration'),
   path('login/', user_login, name='login'),
   path('logout/', user_logout, name='logout'),
   path('profile/get-profile-info/', get_profile_info, name='profile-info'),
   path('profile/edit-profile-info/', edit_profile_info, name='edit-profile-info')
]