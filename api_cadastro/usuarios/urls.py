from django.urls import path
from .views import CadastroUsuarioView, UsuarioList

urlpatterns = [
    path('cadastro/', CadastroUsuarioView.as_view(), name='cadastro-usuario'),
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
]
