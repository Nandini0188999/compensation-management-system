from rest_framework import generics, permissions
from .models import ReviewCycle
from .serializers import ReviewCycleSerializer
from rest_framework import (
    generics,
    permissions,
    status
)

from rest_framework.views import APIView

from rest_framework.response import Response

from django.utils import timezone

from decimal import Decimal

from .serializers import (
    ReviewCycleSerializer,
    SalaryProposalSerializer,
    ProposalDecisionSerializer
)
from employees.models import SalaryRecord
from .models import (
    ReviewCycle,
    SalaryProposal,
    SalaryHistory
)
from .serializers import (
    ReviewCycleSerializer,

    SalaryProposalSerializer,

    ProposalDecisionSerializer,

    SalaryHistorySerializer
)

class ReviewCycleListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = ReviewCycleSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = ReviewCycle.objects.all()

    def perform_create(self, serializer):

        serializer.save(
            created_by=self.request.user
        )
from .models import SalaryProposal
from .serializers import (
    SalaryProposalSerializer
)


class SalaryProposalListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = (
        SalaryProposalSerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    queryset = (
        SalaryProposal.objects.all()
    )

class ApproveProposalView(APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, pk):

        try:

            proposal = (
                SalaryProposal.objects.get(id=pk)
            )

        except SalaryProposal.DoesNotExist:

            return Response(
                {
                    'error': 'Proposal not found.'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if proposal.proposed_by == request.user:

            return Response(
                {
                    'error':
                    'You cannot approve '
                    'your own proposal.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if proposal.status != 'PROPOSED':

            return Response(
                {
                    'error':
                    'Proposal already decided.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        approved_total = (
            SalaryProposal.objects.filter(
                review_cycle=proposal.review_cycle,
                status='APPROVED'
            )
            .exclude(id=proposal.id)
        )

        total_approved_cost = sum(
            [
                p.cost_of_change
                for p in approved_total
            ],
            Decimal('0')
        )

        remaining_budget = (
            proposal.review_cycle.total_budget
            - total_approved_cost
        )

        if (
            proposal.cost_of_change
            > remaining_budget
        ):

            return Response(
                {
                    'error':
                    'Budget exceeded.',

                    'remaining_budget':
                    str(remaining_budget),

                    'proposal_cost':
                    str(proposal.cost_of_change)
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = (
            ProposalDecisionSerializer(
                data=request.data
            )
        )

        serializer.is_valid(raise_exception=True)

        proposal.status = 'APPROVED'

        proposal.decided_by = request.user

        proposal.decision_note = (
            serializer.validated_data.get(
                'decision_note',
                ''
            )
        )

        proposal.decided_at = timezone.now()

        proposal.save()

        return Response(
            {
                'message':
                'Proposal approved successfully.'
            }
        )

class RejectProposalView(APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, pk):

        try:

            proposal = (
                SalaryProposal.objects.get(id=pk)
            )

        except SalaryProposal.DoesNotExist:

            return Response(
                {
                    'error': 'Proposal not found.'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if proposal.proposed_by == request.user:

            return Response(
                {
                    'error':
                    'You cannot reject '
                    'your own proposal.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if proposal.status != 'PROPOSED':

            return Response(
                {
                    'error':
                    'Proposal already decided.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = (
            ProposalDecisionSerializer(
                data=request.data
            )
        )

        serializer.is_valid(raise_exception=True)

        proposal.status = 'REJECTED'

        proposal.decided_by = request.user

        proposal.decision_note = (
            serializer.validated_data.get(
                'decision_note',
                ''
            )
        )

        proposal.decided_at = timezone.now()

        proposal.save()

        return Response(
            {
                'message':
                'Proposal rejected successfully.'
            }
        )

class CloseReviewCycleView(APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, pk):

        try:

            cycle = ReviewCycle.objects.get(
                id=pk
            )

        except ReviewCycle.DoesNotExist:

            return Response(
                {
                    'error':
                    'Cycle not found.'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        unresolved_count = (
            cycle.proposals.filter(
                status='PROPOSED'
            ).count()
        )

        if unresolved_count > 0:

            return Response(
                {
                    'error':
                    'Cannot close cycle. '
                    f'{unresolved_count} '
                    'proposals still unresolved.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        approved_proposals = (
            cycle.proposals.filter(
                status='APPROVED'
            )
        )

        for proposal in approved_proposals:

            salary_record = (
                SalaryRecord.objects.get(
                    employee=proposal.employee
                )
            )

            SalaryHistory.objects.create(

                employee=proposal.employee,

                proposal=proposal,

                change_type=proposal.change_type,

                previous_salary=(
                    proposal.current_salary_snapshot
                ),

                new_salary=(
                    proposal.proposed_new_salary
                ),

                effective_date=(
                    cycle.effective_date
                )
            )

            salary_record.current_salary = (
                proposal.proposed_new_salary
            )

            salary_record.effective_date = (
                cycle.effective_date
            )

            salary_record.save()

        cycle.status = 'CLOSED'

        cycle.save()

        return Response(
            {
                'message':
                'Cycle closed successfully.'
            }
        )

class MySalaryHistoryView(
    generics.ListAPIView
):

    serializer_class = (
        SalaryHistorySerializer
    )

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        return SalaryHistory.objects.filter(
            employee=self.request.user
        )
