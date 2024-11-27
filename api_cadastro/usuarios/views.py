from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
# from .models import Usuario
from django.contrib.auth.models import User
from .serializers import UsuarioSerializer
from rest_framework.permissions import AllowAny 
from rest_framework.authtoken.models import Token

from django.shortcuts import render


class CadastroUsuarioView(APIView):
    permission_classes = [AllowAny] # Permite acesso público a este endpoint
    def get(self, request):
        return render(request, 'usuarios/cadastro.html')
    def post(self, request, *args, **kwargs):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
             # Cria o token para o novo usuário
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioList(APIView):
    permission_classes = [AllowAny] #tirar depois
    def get(self, request):
        usuarios = User.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)