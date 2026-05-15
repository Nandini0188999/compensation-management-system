import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage
from "./pages/LoginPage";

import DashboardPage
from "./pages/DashboardPage";

import {
  AuthProvider
} from "./context/AuthContext";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;