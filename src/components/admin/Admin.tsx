import React from "react";
import ProductManagement from "./ProductManagement";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Product Management
        </h2>
        <ProductManagement />
      </div>
    </div>
  );
};

export default Admin;
