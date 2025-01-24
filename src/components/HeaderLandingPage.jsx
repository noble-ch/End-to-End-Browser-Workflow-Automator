import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = false; // Replace with actual authentication logic

  const linkClasses =
    "text-gray-700 hover:text-primary transition font-semibold";

  return (
    <header className="bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 w-full py-1 px-8 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="#" className="text-2xl font-extrabold text-primary">
          Auto
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-12">
          <nav className="hidden md:flex space-x-8">
            <Link
               href="#features"
              className={`${linkClasses} border-b-2 border-transparent hover:border-primary pb-1`}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className={`${linkClasses} border-b-2 border-transparent hover:border-primary pb-1`}
            >
              Pricing
            </Link>
            <Link
              href="about"
              className={`${linkClasses} border-b-2 border-transparent hover:border-primary pb-1`}
            >
              About
            </Link>
          </nav>

          {/* User Actions */}
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Button */}
              <Button
                className="flex items-center text-gray-700 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <span className="mr-2"></span>{" "}
                {/* Placeholder for profile icon */}
                Profile
              </Button>

              {/* Profile Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-md"
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
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-md"
                    onClick={() => {
                      alert("Logged out");
                      setIsMenuOpen(false); // Close the menu on logout
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Authentication Links
            <div className="flex space-x-4">
              <Link
                href="/auth/signin"
                className={`${linkClasses}  px-4 py-2 rounded-md shadow-sm hover:bg-gray-100`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="text-white bg-primary  px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
