# Generated by Django 5.1.1 on 2024-09-19 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0009_movies_cookie_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='cookie_id',
            field=models.TextField(),
        ),
    ]
