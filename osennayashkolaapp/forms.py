from django import forms
from . import models

class RegistrationPhase1Form(forms.ModelForm):
    # custom fields
    sex = forms.ChoiceField(
        widget=forms.RadioSelect, choices=[
            ('male', 'Парень'),
            ('female', 'Девушка'),
        ], initial=('male', 'Парень')
    )
    dateofbirth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))

    # general fields
    class Meta:
        model = models.User
        fields = ['avatar', 'name', 'sex', 'dateofbirth', 'tg', 'phone', 'about']
