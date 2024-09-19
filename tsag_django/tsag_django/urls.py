from django.urls import path
from movies.views import (
    MoviesCreateView,
    MoviesDetailView,
    MoviesListView,
    MoviesDeleteView,
    MoviesDetailCookieIdView,
)

urlpatterns = [
    path('movies/', MoviesListView.as_view(), name='movies-list'),  # List all moviess
    path('movies/create/', MoviesCreateView.as_view(), name='movies-create'),  # Create a movies
    path('movies/<int:id>/', MoviesDetailView.as_view(), name='movies-detail'),  # Retrieve a movies by ID
    path('movies/<str:imdb_id>/delete/', MoviesDeleteView.as_view(), name='movies-delete'),  # Delete a movies

    path('movies/<str:cookie_id>/', MoviesDetailCookieIdView.as_view(), name="movies-list-cookie-id"),
]
