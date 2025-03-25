from django.contrib import admin
from django.urls import path, include

from api_users.urls import urlpatterns as api_users
from api_products.urls import urlpatterns as api_products

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_users/', include(api_users), name='api_users'),
    path('api_products/', include(api_products), name='api_products')
]
