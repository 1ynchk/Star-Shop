from django.apps import apps
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import (
    Category,
    Book,
    Chancellery
)
from .serializers import (
    CategorySerializer,
    BookPageSerializer,
    ChancelleryPageSerializer
    )

# Create your views here.
@api_view(http_method_names=['GET'])
def get_categories(request):
    '''Получение всех категорий'''
    
    queryset = Category.objects.prefetch_related('subcats').all()
    serialized_queryset = CategorySerializer(queryset, many=True).data 

    return Response({'status': 'ok', 'comment': 'success', 'result': serialized_queryset})

@api_view(http_method_names=['GET'])
def get_product(request):
    '''Получение продукта для страницы products'''

    id = request.GET.get('id')
    type = request.GET.get('type')

    try:
        model_class = apps.get_model('api_products', type)
    except Exception:
        return Response({'status': 'error', 'comment': 'type doens\t exists'}, status=400)

    try: 
        fields = {'subcat'}
        
        if type == 'book':
            fields.add('author')
            
        product = model_class \
            .objects \
            .select_related(*fields) \
            .prefetch_related('ancillary_images') \
            .get(id=id)
    except Exception:
        return Response({'status': 'error', 'comment': 'product doesn\t exists'}, status=400)

    if type == 'book':
        
        serialized_product = BookPageSerializer(product).data
    if type == 'chancellery':
        serialized_product = ChancelleryPageSerializer(product).data
    
        
    return Response({'status': 'ok', 'comment': 'success', 'result': serialized_product})