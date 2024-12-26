import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("bg-white shadow-md py-4 px-8")}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          MyLogo
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/features"
            className="text-gray-700 hover:text-primary transition"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-gray-700 hover:text-primary transition"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-primary transition"
          >
            About
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/auth/signin">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>

          {/* Dropdown for authenticated users */}
          <div className="relative">
            <button
              className="flex items-center text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="mr-2">👤</span> {/* Add an avatar image here */}
              <span>Profile</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Logged out")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
