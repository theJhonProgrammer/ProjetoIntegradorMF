from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=200)
    telefone = models.CharField(max_length=11)
    endereco=models.CharField(max_length=200)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'nome']

    def __str__(self):
        return self.email

    # Evitando conflitos nas relações reversas
    groups = models.ManyToManyField(
        Group,
        related_name='usuario_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='usuario_user_permissions',
        blank=True,
    )