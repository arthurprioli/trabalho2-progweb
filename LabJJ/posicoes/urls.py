app_name = "posicoes"

from django.urls import path
from posicoes import views

urlpatterns = [
    path("lista/", views.PosicoesView.as_view(), name="lista-posicoes"),
]
