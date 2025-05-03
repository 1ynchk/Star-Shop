from pathlib import Path
import os 
import dotenv

dotenv.load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-@t28w)(t=(sr-msp2$yp#$j)t^vmz948dw@tn-1unc0nqmzh=2'

DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1'
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # apps 
    'api_users',
    'api_products',
    'api_main',
    
    # 3rd party
    'corsheaders',
    'rest_framework',
    'storages'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# COOKIES

CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'

SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True

SESSION_ENGINE = "django.contrib.sessions.backends.db"

HOST_VAR = 'http://127.0.0.1:3000'

CORS_ALLOWED_ORIGINS = [
    HOST_VAR
]
CSRF_TRUSTED_ORIGINS = [
        HOST_VAR
    ]

CORS_ALLOWED_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'starshop.urls'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 5
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'starshop.wsgi.application'

# DATABASE

import psycopg

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'USER': os.getenv('DB_USER') 
    }
}

AUTH_USER_MODEL = 'api_users.Users'

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# S3 VAULT

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'  

STORAGES = {
    'default': {
    'BACKEND': 'storages.backends.s3.S3Storage',
    'OPTIONS': {
        'access_key': os.getenv('AWS_ACCESS_KEY_ID'),
        'secret_key': os.getenv('AWS_SECRET_ACCESS_KEY'),
        'bucket_name': os.getenv('AWS_STORAGE_BUCKET_NAME'),
        'endpoint_url': os.getenv('AWS_S3_ENDPOINT_URL'),
        'signature_version': 's3' 
        },
    },
    'staticfiles': {
    'BACKEND': 'storages.backends.s3.S3Storage',
    'OPTIONS': {
        'access_key': os.getenv('AWS_ACCESS_KEY_ID'),
        'secret_key': os.getenv('AWS_SECRET_ACCESS_KEY'),
        'bucket_name': os.getenv('AWS_STORAGE_BUCKET_NAME'),
        'endpoint_url': os.getenv('AWS_S3_ENDPOINT_URL'),
        'signature_version': 's3' 
    },
    } 
}

MEDIA_URL = f'{os.getenv('AWS_S3_ENDPOINT_URL')}/{os.getenv('AWS_STORAGE_BUCKET_NAME')}/media/'
STATIC_URL = f'{os.getenv('AWS_S3_ENDPOINT_URL')}/{os.getenv('AWS_STORAGE_BUCKET_NAME')}/static/'