import React from "react";
import Header from "./Header"; // Adjust the path based on your structure

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
