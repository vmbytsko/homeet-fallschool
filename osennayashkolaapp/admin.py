from django.contrib import admin
from . import models

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'sex', 'tg')
    list_filter = ('is_active', 'sex')
    search_fields = ('name', 'about')
    list_display_links = ('id', 'name')

# Register your models here.
admin.site.register(models.User, UserAdmin)
#admin.site.register(models.User)