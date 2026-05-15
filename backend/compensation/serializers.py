from rest_framework import serializers
from .models import ReviewCycle
from .models import SalaryProposal
from employees.models import SalaryRecord
from .models import (
    ReviewCycle,
    SalaryProposal,
    SalaryHistory
)
class ReviewCycleSerializer(serializers.ModelSerializer):

    created_by_email = serializers.CharField(
        source='created_by.email',
        read_only=True
    )

    class Meta:
        model = ReviewCycle
        fields = [
            'id',
            'title',
            'effective_date',
            'total_budget',
            'status',
            'created_by',
            'created_by_email',
            'created_at'
        ]

        read_only_fields = [
            'status',
            'created_by',
            'created_at'
        ]

    def validate_total_budget(self, value):

        if value <= 0:
            raise serializers.ValidationError(
                "Budget must be greater than zero."
            )

        return value

    def validate_title(self, value):

        if not value.strip():
            raise serializers.ValidationError(
                "Title cannot be empty."
            )

        return value
class SalaryProposalSerializer(
    serializers.ModelSerializer
):

    employee_email = serializers.CharField(
        source='employee.email',
        read_only=True
    )

    proposed_by_email = serializers.CharField(
        source='proposed_by.email',
        read_only=True
    )

    class Meta:
        model = SalaryProposal

        fields = [
            'id',

            'employee',
            'employee_email',

            'review_cycle',

            'change_type',

            'current_salary_snapshot',

            'proposed_new_salary',

            'cost_of_change',

            'justification',

            'status',

            'proposed_by',
            'proposed_by_email',

            'decision_note',

            'created_at',
            'updated_at'
        ]

        read_only_fields = [
            'current_salary_snapshot',
            'cost_of_change',
            'status',
            'proposed_by',
            'created_at',
            'updated_at'
        ]

    def validate(self, data):

        employee = data['employee']

        salary_record = SalaryRecord.objects.get(
            employee=employee
        )

        current_salary = (
            salary_record.current_salary
        )

        proposed_salary = (
            data['proposed_new_salary']
        )

        if proposed_salary <= current_salary:

            raise serializers.ValidationError(
                "New salary must be greater "
                "than current salary."
            )

        justification = (
            data['justification']
        )

        if not justification.strip():

            raise serializers.ValidationError(
                "Justification is required."
            )

        return data

    def create(self, validated_data):

        employee = validated_data['employee']

        salary_record = SalaryRecord.objects.get(
            employee=employee
        )

        current_salary = (
            salary_record.current_salary
        )

        proposed_salary = (
            validated_data['proposed_new_salary']
        )

        cost = (
            proposed_salary - current_salary
        )

        proposal = SalaryProposal.objects.create(
            employee=employee,

            review_cycle=validated_data[
                'review_cycle'
            ],

            change_type=validated_data[
                'change_type'
            ],

            current_salary_snapshot=current_salary,

            proposed_new_salary=proposed_salary,

            cost_of_change=cost,

            justification=validated_data[
                'justification'
            ],

            proposed_by=self.context[
                'request'
            ].user
        )

        return proposal

class ProposalDecisionSerializer(
    serializers.Serializer
):

    decision_note = serializers.CharField(
        required=False,
        allow_blank=True
    )

class SalaryHistorySerializer(
    serializers.ModelSerializer
):

    employee_email = serializers.CharField(
        source='employee.email',
        read_only=True
    )

    class Meta:

        model = SalaryHistory

        fields = [
            'id',

            'employee',
            'employee_email',

            'proposal',

            'change_type',

            'previous_salary',
            'new_salary',

            'effective_date',

            'applied_at'
        ]