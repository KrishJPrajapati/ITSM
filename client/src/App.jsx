import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import TicketManagementPage from "./pages/TicketManagementPlatformpage";
import AssetManagementPage from "./pages/AssetManagementpage";
import RemoteTroubleshootingLogsPage from "./pages/RemoteTroubleshootingLogspage";
import ServerHealthPage from "./pages/ServerHealthPage";
import SLADashboardPage from "./pages/Sladashboardpage";
import Loginpage from "./pages/Loginpage";
import MyTicketsPage from "./pages/MyTicketsPage";
import AssignedTicketsPage from "./pages/AssignedTicketsPage";
import UsersPage from "./pages/UsersPage";

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles  }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Route */}
        <Route path="/login" element={<Loginpage />} />
        
        {/* CLIENT ROUTES */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["clientEmployee"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/client/ticket" element={<TicketManagementPage />} />
          <Route path="/client/my-tickets" element={<MyTicketsPage />} />
          {/* <Route path="/client/users" element={<UsersPage />} /> */}
        </Route>
        
        {/* IT EMPLOYEE ROUTES */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["itEmployee"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/it/ticket" element={<TicketManagementPage />} />
          <Route path="/it/asset" element={<AssetManagementPage />} />
          <Route path="/it/remote-logs" element={<RemoteTroubleshootingLogsPage />} />
          <Route path="/it/server-health" element={<ServerHealthPage />} />
          <Route path="/it/sla-dashboard" element={<SLADashboardPage />} />
          <Route path="/it/my-tickets" element={<MyTicketsPage />} />
          <Route path="/it/assigned-tickets" element={<AssignedTicketsPage />} />
          <Route path="/it/users" element={<UsersPage />} />
        </Route>
        
        {/* Protected Dashboard Routes
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
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;