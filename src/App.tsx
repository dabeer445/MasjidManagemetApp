import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ClerkProvider, SignedIn } from '@clerk/clerk-react';

// Import page components
import Donations from './pages/Donations';
import Expenses from './pages/Expenses';
import Projects from './pages/Projects';
import Donors from './pages/Donors';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import NavbarWrapper from './components/NavbarWrapper';

const clerkPubKey = "pk_test_dWx0aW1hdGUtb2N0b3B1cy04MC5jbGVyay5hY2NvdW50cy5kZXYk";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
};

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <NextUIProvider>
        <Router>
          <div className="flex flex-col w-full min-h-screen bg-background">
            <NavbarWrapper />
            <main className="flex min-h-[calc(100vh_-_64px)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
                <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NextUIProvider>
    </ClerkProvider>
  );
};

export default App;