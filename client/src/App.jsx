import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import TicketManagementPage from "./pages/TicketManagementPlatformpage";
import AssetManagementPage from "./pages/AssetManagementpage";
import RemoteTroubleshootingLogsPage from "./pages/RemoteTroubleshootingLogspage";
import ServerHealthPage from "./pages/ServerHealthPage";
import Loginpage from "./pages/Loginpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Loginpage />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/ticket" />} />
          <Route path="/ticket" element={<TicketManagementPage />} />
          <Route path="/asset" element={<AssetManagementPage />} />
          <Route path="/remote-logs" element={<RemoteTroubleshootingLogsPage />} />
          <Route path="/server-health" element={<ServerHealthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;