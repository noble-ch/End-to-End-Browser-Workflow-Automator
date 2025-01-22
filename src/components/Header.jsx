"use client";

import React from "react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const isAuthenticated = useAuth();

  return (
    <header className="bg-white p-2 w-full">
      <a
        href={isAuthenticated ? "/dashboard" : "/"}
        className="text-lg text-primary font-bold"
      >
        <h1>Auto</h1>
      </a>
    </header>
  );
};

export default Header;
