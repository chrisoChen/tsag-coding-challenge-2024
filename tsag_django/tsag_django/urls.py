from django.urls import path
from movies.views import (
    MoviesCreateView,
    MoviesDetailView,
    MoviesListView,
    MoviesDeleteView,
)

urlpatterns = [
    path('movies/', MoviesListView.as_view(), name='movies-list'),  # List all moviess
    path('movies/create/', MoviesCreateView.as_view(), name='movies-create'),  # Create a movies
    path('movies/<int:id>/', MoviesDetailView.as_view(), name='movies-detail'),  # Retrieve a movies by ID
    path('movies/<int:id>/delete/', MoviesDeleteView.as_view(), name='movies-delete'),  # Delete a movies
]
