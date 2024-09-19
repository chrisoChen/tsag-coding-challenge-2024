from django.shortcuts import render
from movies.models import Movies
from movies.serializers import MoviesSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, ListCreateAPIView


# Make a movie
class MoviesCreateView(ListCreateAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer

    def perform_create(self, serializer):
        serializer.save()


# Get a movie by id
class MoviesDetailView(RetrieveAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer
    lookup_field = 'id'


# Get movies based on cookie id
class MoviesDetailCookieIdView(ListAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer
    lookup_field = 'cookie_id'


# Get all movies
class MoviesListView(ListAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer


# Delete a movie
class MoviesDeleteView(DestroyAPIView):
    queryset = Movies.objects.all()
    serializer_class = MoviesSerializer
    lookup_field = 'imdb_id'


