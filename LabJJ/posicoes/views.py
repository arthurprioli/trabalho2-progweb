from django.shortcuts import render
from posicoes.serializers import BJJPosSerializer
from posicoes.models import BJJPos
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PosicaoView(APIView):
    def get(self, req, id_arg=None):
        # If id_arg provided, return single position
        if id_arg is not None:
            try:
                queryset = BJJPos.objects.get(id=id_arg)
                serializer = BJJPosSerializer(queryset)
                return Response(serializer.data)
            except BJJPos.DoesNotExist:
                return Response({
                    'msg': f'Posição com id #{id_arg} não existe'
                }, status.HTTP_404_NOT_FOUND)
        # Otherwise return all positions
        queryset = BJJPos.objects.all().order_by("nome_pt")
        serializer = BJJPosSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, req):
        serializer = BJJPosSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    def put(self, req, id_arg):
        try:
            posicao = BJJPos.objects.get(id=id_arg)
        except BJJPos.DoesNotExist:
            return Response({
                'msg': f'Posição com id #{id_arg} não existe'
            }, status.HTTP_404_NOT_FOUND)

        serializer = BJJPosSerializer(posicao, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)



# Create your views here.
class PosicoesView(APIView):
    def get(self, req):
        posicoes = BJJPos.objects.all().order_by('nome_pt')
        serializer = BJJPosSerializer(posicoes, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def delete(self, req):
        id_erro = ""
        erro = False
        for id in req.data:
            posicao = BJJPos.objects.get(id=id)
            if posicao:
                posicao.delete()
            else:
                id_erro += str(id)
                erro = True
        if erro:
            return Response({'Erro': f'item [{id_erro}] não encontrado'}, status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)