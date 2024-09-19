from django.contrib.auth.models import Group, User
from rest_framework import serializers
from movies.models import Movies, Ratings


class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ['source', 'value']


class MoviesSerializer(serializers.ModelSerializer):
    ratings = RatingsSerializer(many=True)

    class Meta:
        model = Movies
        fields = ['title', 'ratings']
    
    def create(self, validated_data):
        ratings_data = validated_data.pop('ratings')

        movies = Movies.objects.create(**validated_data)
        print(movies)
        for rating_data in ratings_data:
            Ratings.objects.create(movies=movies, **rating_data)
        return movies

