import re
from rest_framework import serializers
from datetime import datetime
from .models import User
from django.core.exceptions import ValidationError

FIELD_IS_BLANK = "Обязательное поле"
NAME_IS_INVALID = "Неверный формат имени"

class UserSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(default=datetime.now())
    updated_at = serializers.DateTimeField(default=datetime.now())

    def validate(self, data):
        errors = {}
        
        # проверка имени
        if not re.fullmatch("^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$", data["name"]):
            if "name" not in errors:
                errors.setdefault("name", [])
            errors["name"].append(NAME_IS_INVALID)
        
        if len(errors) != 0:
            raise ValidationError(errors)
        return data

    class Meta:
        model = User
        fields = ("id", "created_at", "updated_at", "avatar", "name", 
                  "sex", "dateofbirth", "tg", "phone", "about",
                  "occupation", "course", "level", "faculty", "programme",
                  "job", "is_active")
        extra_kwargs = {
            "name": {"error_messages": {"blank": FIELD_IS_BLANK}},
            "dateofbirth": {"error_messages": {"blank": FIELD_IS_BLANK}},
            "tg": {"error_messages": {"blank": FIELD_IS_BLANK}},
            "phone": {"error_messages": {"blank": FIELD_IS_BLANK}}
            }