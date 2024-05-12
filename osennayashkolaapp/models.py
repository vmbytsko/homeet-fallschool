from django.db import models

# Create your models here.
class User(models.Model):

    # step one
    avatar = models.ImageField(upload_to = "static/useravatars/",max_length=100,null=True,blank=True)
    name = models.CharField(max_length=100)
    sex = models.CharField(max_length=100, choices=[
            ('male', 'Парень'),
            ('female', 'Девушка'),
        ], null=False, blank=False)
    dateofbirth = models.DateTimeField()
    tg = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    about = models.TextField(null=True,blank=True)
    
    # step two
    occupation = models.CharField(max_length=100,null=True,blank=True)
    course = models.IntegerField(null=True,blank=True)
    level = models.CharField(max_length=100,null=True,blank=True)
    faculty = models.CharField(max_length=1000,null=True,blank=True)
    programme = models.CharField(max_length=100,null=True,blank=True)
    job = models.CharField(max_length=1000,null=True,blank=True)

    # additional variables
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
