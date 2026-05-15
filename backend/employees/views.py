from rest_framework import (
    generics,
    permissions
)

from .models import SalaryRecord

from .serializers import (
    SalaryRecordSerializer
)

from django.contrib.auth import (
    get_user_model
)

from accounts.serializers import (
    UserSerializer
)

User = get_user_model()


class SalaryListView(
    generics.ListAPIView
):

    serializer_class = (
        SalaryRecordSerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    queryset = (
        SalaryRecord.objects.all()
    )


class MySalaryView(
    generics.RetrieveAPIView
):

    serializer_class = (
        SalaryRecordSerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_object(self):

        return SalaryRecord.objects.get(
            employee=self.request.user
        )


class EmployeeListView(
    generics.ListAPIView
):

    serializer_class = (
        UserSerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    queryset = User.objects.all()