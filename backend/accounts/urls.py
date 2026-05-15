from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .views import (
    RegisterView,
    CurrentUserView,
    MyTokenObtainPairView
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view()
    ),

    path(
        'login/',
        MyTokenObtainPairView.as_view()
    ),

    path(
        'token/refresh/',
        TokenRefreshView.as_view()
    ),

    path(
        'me/',
        CurrentUserView.as_view()
    ),
]