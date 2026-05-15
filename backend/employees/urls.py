from django.urls import path
from .views import (
    MySalaryView,
    SalaryListView
)

urlpatterns = [
    path('me/', MySalaryView.as_view()),
    path('', SalaryListView.as_view()),
]