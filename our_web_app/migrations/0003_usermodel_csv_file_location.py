# Generated by Django 3.1.2 on 2020-10-27 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('our_web_app', '0002_auto_20201027_0213'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='csv_file_location',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]
