from rest_framework.response import Response
from django.db.models import QuerySet
from ..serializers import ReviewsSerializer
from ..pagination import ReviewsPagination

def get_paginated_response_for_reviews(queryset: QuerySet,request: dict) -> Response:
    '''Пагинированный ответ для отзывов'''
    paginator = ReviewsPagination()
    
    page = paginator.paginate_queryset(queryset, request)
    
    if page is not None:
        serializer = ReviewsSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    serializer = ReviewsSerializer(queryset, many=True)
    return serializer.data
    
    