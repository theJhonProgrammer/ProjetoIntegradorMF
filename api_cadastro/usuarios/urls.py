from django.urls import path
from .views import CadastroUsuarioView, UsuarioList
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('cadastro/', CadastroUsuarioView.as_view(), name='cadastro-usuario'),
    path('usuarios/', UsuarioList.as_view(), name='usuario-list'),
    path('auth/', obtain_auth_token, name='api_token_auth'), #login

]
