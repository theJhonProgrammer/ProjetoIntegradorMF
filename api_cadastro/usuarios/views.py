from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import Usuario
from django.contrib.auth.models import User
from .serializers import UsuarioSerializer, AgendamentoSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from .models import Agendamento
from django.contrib import messages

class CadastroUsuarioView(APIView):
    permission_classes = [AllowAny] # Permite acesso público a este endpoint
    def get(self, request):
        return render(request, 'usuarios/cadastro.html')
    def post(self, request):
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

class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny] # Permite acesso público a este endpoint
    def get(self, request):
        return render(request, 'usuarios/login.html')
    def post(self, request):
        # Use a classe serializer da base
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'redirect_url': '/api/pedidos/',
                    'token': token.key
                    
                })
        return Response({'error': 'Credenciais inválidas'}, 
                            status=status.HTTP_401_UNAUTHORIZED)
        
    
class MenuView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return render(request, 'usuarios/index.html')
    
class PedidosView(APIView):
    permission_classes = [AllowAny] #isautenticated nao funciona
    def get(self, request):
        agendamentos = Agendamento.objects.all()
        return render(request, 'usuarios/pedidos.html', {
            'agendamentos': agendamentos
    })

    
    def post(self, request):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
            ag = serializer.save()
            return Response({
                "agendamentos": serializer.data, 
                "message": "Agendamento adicionado com sucesso!"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "errors": serializer.errors, 
                "message": "Erro ao adicionar agendamento. Verifique os dados."
            }, status=status.HTTP_400_BAD_REQUEST)
class PedidosUpdateDeleteView(APIView):  
    permission_classes = [AllowAny] #isautenticated nao funciona
    def delete(self, request, pk):
        ag = get_object_or_404(Agendamento, pk=pk)
        ag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        ag = get_object_or_404(Agendamento, pk=pk)
        print(request.data)
        serializer = AgendamentoSerializer(ag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AgendamentoList(APIView):
    permission_classes = [AllowAny] #tirar depois
    def get(self, request):
        g = Agendamento.objects.all()
        serializer = AgendamentoSerializer(g, many=True)
        return Response(serializer.data)
    
class PesquisaView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return render(request, 'usuarios/pesquisa.html')