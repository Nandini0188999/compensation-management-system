from rest_framework import generics, permissions
from .models import SalaryRecord
from .serializers import SalaryRecordSerializer


class MySalaryView(generics.RetrieveAPIView):

    serializer_class = SalaryRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return SalaryRecord.objects.get(
            employee=self.request.user
        )


class SalaryListView(generics.ListAPIView):

    serializer_class = SalaryRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = SalaryRecord.objects.all()