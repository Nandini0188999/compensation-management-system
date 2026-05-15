from django.contrib import admin

from .models import (
    ReviewCycle,
    SalaryProposal,
    SalaryHistory
)

admin.site.register(ReviewCycle)
admin.site.register(SalaryProposal)
admin.site.register(SalaryHistory)