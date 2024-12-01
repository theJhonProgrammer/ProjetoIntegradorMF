from django.urls import path
from .views import CadastroUsuarioView, UsuarioList,LoginView, MenuView, PedidosView
from rest_framework.authtoken.views import obtain_auth_token

from . import views
urlpatterns = [
    path('cadastro/', CadastroUsuarioView.as_view(), name='cadastro-usuario'),
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
    path('login/', LoginView.as_view(), name='api_token_auth'), 
    path('menu/', MenuView.as_view(), name='menu'),
    path('pedidos/', PedidosView.as_view(), name='menu'),


]
