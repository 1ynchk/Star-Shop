from django.contrib import admin
from django.urls import path, include

from api_users.urls import urlpatterns as api_users

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_users/', include(api_users))
]
