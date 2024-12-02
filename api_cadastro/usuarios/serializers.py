from rest_framework import serializers
# from .models import Usuario
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.hashers import make_password
from .models import Agendamento

class UsuarioSerializer(serializers.ModelSerializer):
    # define que ela so vai ser escrita e nao lida no get
    password = serializers.CharField(write_only=True, required=True)
    telefone = models.CharField(max_length=11)
    endereco = models.CharField(max_length=200)
    class Meta:
        model = User
        
        # adicionar telefone e endereco denovo na proxima aula vamos ver
        fields = ['id', 'username', 'first_name',  'email', 'password']
        
      
# O método create criptografa a senha antes de salvar
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'