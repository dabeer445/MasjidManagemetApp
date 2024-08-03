import { NavbarContent, Navbar, NavbarMenuToggle, NavbarBrand, NavbarItem, Input, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Moon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

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
      <SignedIn>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent justify="start">
          <NavbarBrand>
            <Moon className="w-6 h-6 mr-2" />
            <p className="font-bold text-inherit">Muhammadi Masjid Management System</p>
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
            <UserButton />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu
          className={`fixed top-[var(--navbar-height)] left-0 bottom-0 w-full max-w-[300px] p-0 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={`${item.path}-${index}`}>
              <NavbarMenuItem>
                <Link
                  to={item.path}
                  className={`w-full block py-4 px-6 text-lg ${isActive(item.path) ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-default-100'
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
      </SignedIn>
      <SignedOut>
        <NavbarContent justify="start">
          <NavbarBrand>
            <Moon className="w-6 h-6 mr-2" />
            <p className="font-bold text-inherit">Muhammadi Masjid Management System</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <SignInButton mode="modal">
              <button className="bg-primary text-white px-4 py-2 rounded">
                Login
              </button>
            </SignInButton>
          </NavbarItem>
        </NavbarContent>
      </SignedOut>
    </Navbar>
  );
};


export default NavbarWrapper;
