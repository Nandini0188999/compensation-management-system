from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from rest_framework import (
    generics,
    permissions
)

from rest_framework.response import Response

from .serializers import (
    MyTokenObtainPairSerializer,
    UserSerializer
)


class MyTokenObtainPairView(
    TokenObtainPairView
):

    serializer_class = (
        MyTokenObtainPairSerializer
    )


class RegisterView(
    generics.CreateAPIView
):

    serializer_class = (
        UserSerializer
    )


class CurrentUserView(
    generics.RetrieveAPIView
):

    serializer_class = (
        UserSerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_object(self):

        return self.request.user