import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { NextUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Avatar } from '@nextui-org/react';
import { ChurchIcon, SearchIcon } from 'lucide-react';

// Import page components
import Donations from './pages/Donations';
import Expenses from './pages/Expenses';
import Projects from './pages/Projects';
import Donors from './pages/Donors';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

const NavbarWrapper = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Navbar isBordered>
      <NavbarContent className="justify-start">
        <NavbarBrand>
          <ChurchIcon className="w-6 h-6 mr-2" />
          <p className="font-bold text-inherit">Masjid Management</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 justify-center">
        <NavbarItem>
          <Link
            to="/donations"
            className={isActive('/donations') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Donations
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/expenses"
            className={isActive('/expenses') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Expenses
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/projects"
            className={isActive('/projects') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/donors"
            className={isActive('/donors') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Donors
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/reports"
            className={isActive('/reports') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Reports
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/settings"
            className={isActive('/settings') ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2 rounded'}
          >
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="justify-end">
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarItem>
        <NavbarItem>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="flex flex-col w-full min-h-screen bg-background">
          <NavbarWrapper />
          <main className="flex min-h-[calc(100vh_-_64px)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/donors" element={<Donors />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;