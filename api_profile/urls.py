from django.urls import path

from .views import (
    get_profile_info,
    edit_profile_info,
    FavoriteList
)

urlpatterns = [
    path('get-profile-info/', get_profile_info, name='profile-info'),
    path('edit-profile-info/', edit_profile_info, name='edit-profile-info'),
    path('favorite-list/', FavoriteList.as_view(), name='favorite-list')
]