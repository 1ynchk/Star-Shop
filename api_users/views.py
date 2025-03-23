from rest_framework.decorators import api_view
from django.contrib.auth import login, logout, authenticate
from rest_framework.response import Response

from .models import Users

import time

@api_view(http_method_names=['GET'])
def check_login(request): 
    '''Проверка, авторизирован пользователь или нет'''
    
    if request.user.is_authenticated: 
        response = Response({'auth': True })
        return response
    return Response({'auth': False})

@api_view(http_method_names=['POST'])
def user_login(request):
    '''Авторизация пользователя'''
    
    password = request.data.get('password')
    email = request.data.get('email')
    
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        response = Response({'status': 'ok', 'comment': 'user has logged in'}) 
        response.set_cookie('test_cookie', 'test_value', secure=True, samesite='None', httponly=True)
        return response
    return Response({'status': 'error', 'comment': 'such user doesn\'t exists'}, status=400)

@api_view(http_method_names=['POST'])
def user_logout(request):
    '''Выход из аккаунта пользователя'''
    
    logout(request)
    return Response({'status': 'ok', 'comment': 'user has logged out'})
    
@api_view(http_method_names=['POST'])
def registration(request): 
    '''Регистрация пользователя'''

    password = request.data.get('password')
    email = request.data.get('email')
    
    try: 
        Users.objects.get(email=email)     
        return Response({ 'status': 'error', 'comment': 'There is such a users', }, status=401)
    except Exception:
        name = request.data.get('name')
        surname = request.data.get('surname')
        user = Users(email=email, name=name, surname=surname) 
        user.set_password(password)
        user.save()
        
        response = Response({'status': 'ok', 'comment': 'Users object\'s been created'}, status=202)
        return response
        