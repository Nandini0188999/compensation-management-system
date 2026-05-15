import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  AuthProvider
} from "./context/AuthContext";

import ProtectedRoute
from "./routes/ProtectedRoute";

import MainLayout
from "./layouts/MainLayout";

import LoginPage
from "./pages/LoginPage";

import DashboardPage
from "./pages/DashboardPage";

import ReviewCyclesPage
from "./pages/ReviewCyclesPage";

import ProposalsPage
from "./pages/ProposalsPage";

import EmployeesPage
from "./pages/EmployeesPage";

import AnalyticsPage
from "./pages/AnalyticsPage";

import RegisterPage
from "./pages/RegisterPage";

import EmployeeDashboard
from "./pages/EmployeeDashboard";

import SalaryHistoryPage
from "./pages/SalaryHistoryPage";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* Public Route */}

          <Route
            path="/"
            element={<LoginPage />}
          />

          {/* Protected Dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                <MainLayout>
                  <DashboardPage />
                </MainLayout>

              </ProtectedRoute>
            }
          />
          <Route
  path="/employee-dashboard"
  element={
    <ProtectedRoute>

      <MainLayout>
        <EmployeeDashboard />
      </MainLayout>

    </ProtectedRoute>
  }
/>

          {/* Protected Review Cycles */}

          <Route
            path="/cycles"
            element={
              <ProtectedRoute>

                <MainLayout>
                  <ReviewCyclesPage />
                </MainLayout>

              </ProtectedRoute>
            }
          />

          {/* Protected Proposals */}

          <Route
            path="/proposals"
            element={
              <ProtectedRoute>

                <MainLayout>
                  <ProposalsPage />
                </MainLayout>

              </ProtectedRoute>
            }
          />

          {/* Protected Employees */}

          <Route
            path="/employees"
            element={
              <ProtectedRoute>

                <MainLayout>
                  <EmployeesPage />
                </MainLayout>

              </ProtectedRoute>
            }
          />

          {/* Protected Analytics */}

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>

                <MainLayout>
                  <AnalyticsPage />
                </MainLayout>

              </ProtectedRoute>
            }
          />

          <Route
  path="/register"
  element={<RegisterPage />}
/>
<Route
  path="/salary-history"
  element={
    <ProtectedRoute>

      <MainLayout>
        <SalaryHistoryPage />
      </MainLayout>

    </ProtectedRoute>
  }
/>

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;