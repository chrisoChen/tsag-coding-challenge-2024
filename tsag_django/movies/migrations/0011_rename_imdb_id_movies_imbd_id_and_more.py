# Generated by Django 5.1.1 on 2024-09-19 18:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0010_alter_movies_cookie_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movies',
            old_name='imdb_id',
            new_name='imbd_id',
        ),
        migrations.RenameField(
            model_name='movies',
            old_name='imdb_rating',
            new_name='imbd_rating',
        ),
        migrations.RenameField(
            model_name='movies',
            old_name='imdb_votes',
            new_name='imbd_votes',
        ),
    ]
