from django.shortcuts import render, redirect
from .forms import RegistrationPhase1Form
from rest_framework.viewsets import ModelViewSet
from . import models, serializers

# Create your views here.

def index(request):
    return redirect("registration/");

def registration(request):
    if request.method == "GET":
        registration_phase1_form = RegistrationPhase1Form()
        return render(request, 'registration.html', {"registration_phase1_form": registration_phase1_form})

class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
