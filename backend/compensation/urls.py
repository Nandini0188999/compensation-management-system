from django.urls import path

from .views import (

    ReviewCycleListCreateView,

    SalaryProposalListCreateView,

    ApproveProposalView,
    RejectProposalView,

    CloseReviewCycleView,

    MySalaryHistoryView
)

urlpatterns = [

    path(
        'cycles/',
        ReviewCycleListCreateView.as_view()
    ),

    path(
        'proposals/',
        SalaryProposalListCreateView.as_view()
    ),
    
    path(
    'proposals/<int:pk>/approve/',
    ApproveProposalView.as_view()
    ),

    path(
    'proposals/<int:pk>/reject/',
    RejectProposalView.as_view()
    ),
    
    path(
    'cycles/<int:pk>/close/',
    CloseReviewCycleView.as_view()
    ),

    path(
    'history/me/',
    MySalaryHistoryView.as_view()
    ),
]