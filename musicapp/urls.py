from django.contrib import admin
from django.urls import path     
from . import views
urlpatterns = [
    path('', views.index),	
    path('search', views.search), #POST route to search  
    path('selected_song', views.selected_song), #POST route to get recommended songs
    path('csrf/', views.csrf),
]
