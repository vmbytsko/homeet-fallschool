from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', views.UserViewSet, basename="user-viewset")

urlpatterns = [
    path('', views.index),
    path('registration/', views.registration),
    path('api/v1/', include(router.urls))
]