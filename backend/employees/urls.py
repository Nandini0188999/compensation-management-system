from django.urls import path

from .views import (
    SalaryListView,
    MySalaryView,
    EmployeeListView
)

urlpatterns = [

    path(
        '',
        EmployeeListView.as_view()
    ),

    path(
        'salary/',
        SalaryListView.as_view()
    ),

    path(
        'me/',
        MySalaryView.as_view()
    ),
]