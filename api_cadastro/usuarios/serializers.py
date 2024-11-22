from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'nome',  'email', 'telefone', 'endereco', 'password']
        
        # define que ela so vai ser escrita e nao lida no get
        extra_kwargs = {'password': {'write_only': True}}
# O método create criptografa a senha antes de salvar
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
   