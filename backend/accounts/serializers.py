from rest_framework import serializers

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)

from .models import User


class MyTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    username_field = 'email'


class UserSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [

            'id',

            'email',

            'username',

            'password',

            'role'
        ]

    def create(
        self,
        validated_data
    ):

        password = validated_data.pop(
            'password'
        )

        user = User(
            **validated_data
        )

        user.set_password(
            password
        )

        user.save()

        return user