import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = false; 

  return (
    <header className="bg-transparent top-0 py-4 px-8 absolute w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          MyLogo
        </Link>
        {/* Navigation Links */}
        <div className="flex font-bold items-center space-x-16">
          <nav className="hidden  md:flex space-x-16">
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
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="mr-2"></span> 
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
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-primary transition"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="text-gray-700 hover:text-primary transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
