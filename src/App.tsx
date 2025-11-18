import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import BillingPage from './pages/BillingPage';
import CustomersPage from './pages/CustomersPage';
import ReportsPage from './pages/ReportsPage';
import AiAssistantPage from './pages/AiAssistantPage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import StoreSetupPage from './pages/StoreSetupPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/setup" element={<StoreSetupPage />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="ai-assistant" element={<AiAssistantPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        {/* This catch-all route can be used for a 404 page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
