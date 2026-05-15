# Compensation Management System

A full-stack Compensation Management System built using React, Django REST Framework, and PostgreSQL.

This application helps organizations manage employee compensation workflows including salary review cycles, compensation proposals, approvals/rejections, salary history tracking, and budget validation.

---

# Features

## Authentication & Authorization
- JWT-based authentication
- User registration and login
- Role-based access control
- Admin and Employee dashboards
- Protected frontend routes

## Employee Features
- View current salary
- View salary effective date
- View salary history
- Role-specific dashboard

## Admin Features
- Create review cycles
- Manage compensation proposals
- Approve/reject salary proposals
- Budget validation during approvals
- View all employees and salaries
- Edit/Delete proposals
- Filtering, sorting, and pagination

## Compensation Workflow
- Salary increase proposals
- Promotion proposals
- Market adjustment proposals
- Approval workflows
- Salary history tracking
- Budget enforcement

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend
- Django
- Django REST Framework
- JWT Authentication

## Database
- PostgreSQL

---

# Architecture

## Frontend Structure

```bash
src/
├── api/
├── components/
├── context/
├── layouts/
├── pages/
├── routes/
├── utils/
├── App.jsx
├── main.jsx
```

## Backend Structure

```bash
backend/
├── accounts/
├── employees/
├── compensation/
├── core/
```

### Backend Modules
- accounts → authentication and user management
- employees → salary records and employee data
- compensation → review cycles, proposals, approvals, history

---

# Database Design

The application uses PostgreSQL for persistent relational storage.

## Main Tables
- accounts_user
- employees_salaryrecord
- compensation_reviewcycle
- compensation_salaryproposal
- compensation_salaryhistory

---

# Functional Requirements Implemented

## Authentication
- User registration
- User login/logout
- JWT authentication
- Role-based authorization

## Salary Management
- Employee salary records
- Salary history tracking
- Employee-specific salary visibility

## Review Cycles
- Create review cycles
- Close review cycles
- Budget tracking
- Cycle status management

## Compensation Proposals
- Create proposal
- Approve proposal
- Reject proposal
- Edit proposal
- Delete proposal
- Budget validation
- Decision notes

## Data Management
- Filtering
- Sorting
- Pagination
- Persistent PostgreSQL storage

---

# API Endpoints

## Authentication
- `/api/auth/register/`
- `/api/auth/login/`
- `/api/auth/me/`

## Employees
- `/api/employees/`
- `/api/employees/me/`
- `/api/employees/salary/`

## Compensation
- `/api/compensation/cycles/`
- `/api/compensation/proposals/`
- `/api/compensation/history/me/`

---

# Setup Instructions

## Clone Repository

```bash
git clone <repo-url>
cd compensation-management-system
```

---

# Backend Setup

```bash
cd backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Migrations

```bash
python manage.py migrate
```

## Start Backend Server

```bash
python manage.py runserver
```

---

# Frontend Setup

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

---

# PostgreSQL Setup

Update PostgreSQL credentials in:

```python
backend/core/settings.py
```

Example:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'compensation_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

# AI Usage

AI tools such as ChatGPT were used for:
- boilerplate generation
- debugging assistance
- component structuring
- workflow ideation
- frontend styling guidance

All business logic, architecture decisions, validation workflows, integration handling, and final implementation decisions were manually reviewed and refined.

---

# Challenges Faced

- JWT authentication integration
- Role-based frontend routing
- Budget validation workflows
- Frontend/backend synchronization
- PostgreSQL integration
- Managing compensation approval workflows

---

# Tradeoffs

Given the hackathon time constraints, the project prioritized:
- workflow correctness
- backend business logic
- API reliability
- scalability

instead of advanced UI animations or production deployment infrastructure.

---

# Future Improvements

- Advanced analytics dashboard
- Email notifications
- Multi-level approval workflows
- Performance review integration
- Audit logs
- Export reports
- Salary recommendation ML model
- Compensation forecasting
- Market benchmark analysis

---

# Demo Highlights

- Role-based dashboards
- Compensation review cycles
- Proposal approval/rejection workflows
- Budget validation
- PostgreSQL persistence
- Salary history tracking
- Filtering/sorting/pagination

---

# Author

Nandini Sathuluri
