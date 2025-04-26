from rest_framework.response import Response
from django.apps import apps

def get_type_product(type):
    try:    
        model_class = apps.get_model('api_products', type)
        return model_class
    except Exception:
        return Response({'status': 'error', 'comment': 'type doens\t exists'}, status=400)