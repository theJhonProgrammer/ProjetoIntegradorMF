from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    # define que ela so vai ser escrita e nao lida no get
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        # adicionar telefone e endereco denovo na proxima aula vamos ver
        fields = ['id', 'username', 'first_name',  'password']
        
      
# O método create criptografa a senha antes de salvar
    def create(self, validated_data):
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


   