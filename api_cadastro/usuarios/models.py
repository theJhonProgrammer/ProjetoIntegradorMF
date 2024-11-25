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