// src/components/Layout.tsx
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, User } from "@nextui-org/react";
import { Search } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isBordered>
        <NavbarBrand>
          <ChurchIcon className="w-6 h-6 mr-2" />
          <p className="font-bold text-inherit">Masjid Management</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/donations" className="font-bold">
              Donations
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/expenses" className="font-bold">
              Expenses
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/reports" className="font-bold">
              Reports
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link as={RouterLink} color="foreground" to="/settings">
              Settings
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
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
              startContent={<Search size={18} />}
              type="search"
            />
          </NavbarItem>
          <NavbarItem>
            <User
              name="John Doe"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
              }}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

function ChurchIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2" />
      <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
      <path d="M18 22V5l-6-3-6 3v17" />
      <path d="M12 7v5" />
      <path d="M10 9h4" />
    </svg>
  )
}