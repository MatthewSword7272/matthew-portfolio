import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-grow bg-gray-200 w-full">
        <div className="mt-32" />
        <div className={`flex-grow overflow-hidden ${className}`}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
