import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { NextUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, Avatar } from '@nextui-org/react';
import { Moon, SearchIcon } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/donations', label: 'Donations' },
    { path: '/expenses', label: 'Expenses' },
    { path: '/projects', label: 'Projects' },
    { path: '/donors', label: 'Donors' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <Navbar 
      isBordered 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      className="w-full max-w-full"
      classNames={{
        wrapper: "w-full max-w-full px-6",
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand>
          <Moon className="w-6 h-6 mr-2" />
          <p className="font-bold text-inherit">Muhammadi Management</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path}>
            <Link
              to={item.path}
              className={`px-3 py-2 ${isActive(item.path) ? 'bg-primary text-white rounded' : 'text-foreground'}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
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

      <NavbarMenu
        className={`fixed top-[var(--navbar-height)] left-0 bottom-0 w-full max-w-[300px] p-0 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={`${item.path}-${index}`}>
            <NavbarMenuItem>
              <Link
                to={item.path}
                className={`w-full block py-4 px-6 text-lg ${
                  isActive(item.path) ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-default-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
            {index < menuItems.length - 1 && (
              <div className="w-full h-px bg-default-200" />
            )}
          </React.Fragment>
        ))}
      </NavbarMenu>
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