from rest_framework import serializers
from .models import SalaryRecord


class SalaryRecordSerializer(serializers.ModelSerializer):

    employee_email = serializers.CharField(
        source='employee.email',
        read_only=True
    )

    class Meta:
        model = SalaryRecord
        fields = [
            'id',
            'employee',
            'employee_email',
            'current_salary',
            'effective_date',
            'currency',
            'created_at',
            'updated_at'
        ]