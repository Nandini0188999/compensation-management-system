from django.db import models
from django.conf import settings


class SalaryRecord(models.Model):

    employee = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='salary_record'
    )

    current_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    effective_date = models.DateField()

    currency = models.CharField(
        max_length=10,
        default='INR'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.employee.email} - {self.current_salary}"