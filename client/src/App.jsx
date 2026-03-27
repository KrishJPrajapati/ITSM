import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import TicketManagementPage from "./pages/TicketManagementPlatformpage";
import AssetManagementPage from "./pages/AssetManagementpage";
import RemoteTroubleshootingLogsPage from "./pages/RemoteTroubleshootingLogspage";
import ServerHealthPage from "./pages/ServerHealthPage";
import SLADashboardPage from "./pages/Sladashboardpage";
import Loginpage from "./pages/Loginpage";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Route */}
        <Route path="/login" element={<Loginpage />} />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/ticket" element={<TicketManagementPage />} />
          <Route path="/asset" element={<AssetManagementPage />} />
          <Route path="/remote-logs" element={<RemoteTroubleshootingLogsPage />} />
          <Route path="/server-health" element={<ServerHealthPage />} />
          <Route path="/sla-dashboard" element={<SLADashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;