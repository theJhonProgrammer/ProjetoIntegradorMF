# Generated by Django 5.1.3 on 2024-11-25 23:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_remove_usuario_nome_alter_usuario_email_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]