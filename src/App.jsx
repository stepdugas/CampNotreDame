import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Campers from './pages/Campers';
import CamperProfile from './pages/CamperProfile';
import BunkingBoard from './pages/BunkingBoard';
import Payments from './pages/Payments';
import Staff from './pages/Staff';
import ParentPortal from './pages/ParentPortal';
import RegistrationFlow from './pages/RegistrationFlow';
import CamperMail from './pages/CamperMail';
import Photos from './pages/Photos';
import EmailAutomation from './pages/EmailAutomation';
import Waitlist from './pages/Waitlist';
import FormsDocuments from './pages/FormsDocuments';
import Alumni from './pages/Alumni';
import Analytics from './pages/Analytics';
import Discounts from './pages/Discounts';
import Notifications from './pages/Notifications';

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-w-0 pt-16 lg:pt-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campers" element={<Campers />} />
            <Route path="/campers/:id" element={<CamperProfile />} />
            <Route path="/registration" element={<RegistrationFlow />} />
            <Route path="/bunking" element={<BunkingBoard />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/mail" element={<CamperMail />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/email-automation" element={<EmailAutomation />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/forms" element={<FormsDocuments />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
