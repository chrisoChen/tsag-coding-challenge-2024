from django.db import models

# Create your models here.
class Movies(models.Model): 
    cookie_id = models.TextField(null=False, blank=False)
    title = models.TextField(null=True)
    year = models.TextField(null=True)
    rating = models.CharField(max_length=5, null=True)
    released = models.DateTimeField(auto_now_add=False, null=True)
    runtime = models.TextField(null=True)
    genre = models.TextField(null=True)
    director = models.TextField(null=True)
    writer = models.TextField(null=True)
    actors = models.TextField(null=True)
    plot = models.TextField(null=True)
    language = models.TextField(null=True)
    country = models.TextField(null=True)
    awards  = models.TextField(null=True)
    poster = models.TextField(null=True)
    metascore = models.TextField(null=True)
    imdb_rating = models.TextField(null=True)
    imdb_votes = models.TextField(null=True)
    imdb_id = models.TextField(null=True)
    type = models.TextField(null=True)
    dvd = models.TextField(null=True)
    box_office = models.TextField(null=True)
    production = models.TextField(null=True)
    website = models.TextField(null=True)


class Ratings(models.Model):
    movies = models.ForeignKey(Movies, related_name="ratings", on_delete=models.CASCADE, null=True, blank=True)
    source = models.TextField(null=True)
    value = models.TextField(null=True)


