from django.shortcuts import render
from posicoes.serializers import BJJPosSerializer
from rest_framework.views import APIView
from posicoes.models import BJJPos
from rest_framework.response import Response


# Create your views here.
class PosicoesView(APIView):
    def get(self, req):
        queryset = BJJPos.objects.all().order_by("nome_pt")
        serializer = BJJPosSerializer(queryset, many=True)
        return Response(serializer.data)
