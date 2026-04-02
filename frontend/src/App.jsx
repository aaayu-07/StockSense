import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
