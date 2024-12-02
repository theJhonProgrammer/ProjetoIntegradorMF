from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# class Usuario(AbstractUser):
#     # username=models.CharField(max_length=200)
#     # email = models.EmailField(unique=True)
#     # nome = models.CharField(max_length=200)
#     telefone = models.CharField(max_length=11)
#     endereco=models.CharField(max_length=200)
# # incluir telefone e endereco
#     REQUIRED_FIELDS = [ 'first_name','email']

#     def __str__(self):
#         return self.username

#     # Evitando conflitos nas relações reversas
#     groups = models.ManyToManyField(
#         Group,
#         related_name='usuario_groups',
#         blank=True,
#     )
#     user_permissions = models.ManyToManyField(
#         Permission,
#         related_name='usuario_user_permissions',
#         blank=True,
#     )




class Agendamento(models.Model):
    SERVICO_CHOICES = [
        ('Ajuste de Vestido', 'Ajuste de Vestido'),
        ('Costura', 'Costura'),
        ('Conserto', 'Conserto'),
        ('Outro', 'Outro')
    ]

    STATUS_CHOICES = [
        ('Pendente', 'Pendente'),
        ('Confirmado', 'Confirmado'),
        ('Concluído', 'Concluído'),
        ('Cancelado', 'Cancelado')
    ]

    data = models.DateField()
    hora = models.TimeField()
    cliente = models.CharField(max_length=100)
    servico = models.CharField(max_length=50, choices=SERVICO_CHOICES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    
    def __str__(self):
        return f"{self.cliente} - {self.servico}"