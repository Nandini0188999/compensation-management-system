from django.db import models
from django.conf import settings
from employees.models import SalaryRecord

class ReviewCycle(models.Model):

    class Status(models.TextChoices):
        OPEN = 'OPEN', 'Open'
        CLOSED = 'CLOSED', 'Closed'

    title = models.CharField(
        max_length=255
    )

    effective_date = models.DateField()

    total_budget = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_cycles'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title
class SalaryProposal(models.Model):

    class ProposalStatus(models.TextChoices):
        PROPOSED = 'PROPOSED', 'Proposed'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'

    class ChangeType(models.TextChoices):
        SALARY_INCREASE = (
            'SALARY_INCREASE',
            'Salary Increase'
        )

        PROMOTION = (
            'PROMOTION',
            'Promotion'
        )

        MARKET_ADJUSTMENT = (
            'MARKET_ADJUSTMENT',
            'Market Adjustment'
        )

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='salary_proposals'
    )

    review_cycle = models.ForeignKey(
        ReviewCycle,
        on_delete=models.CASCADE,
        related_name='proposals'
    )

    change_type = models.CharField(
        max_length=50,
        choices=ChangeType.choices
    )

    current_salary_snapshot = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    proposed_new_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    cost_of_change = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    justification = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=ProposalStatus.choices,
        default=ProposalStatus.PROPOSED
    )

    proposed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='proposed_salary_changes'
    )

    decided_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='decided_salary_changes'
    )

    decision_note = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    decided_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return (
            f"{self.employee.email} - "
            f"{self.status}"
        )
class SalaryHistory(models.Model):

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='salary_history'
    )

    proposal = models.ForeignKey(
        SalaryProposal,
        on_delete=models.CASCADE,
        related_name='history_entries'
    )

    change_type = models.CharField(
        max_length=50
    )

    previous_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    new_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    effective_date = models.DateField()

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.employee.email} - "
            f"{self.new_salary}"
        )