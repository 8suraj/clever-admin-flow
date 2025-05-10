
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import Subscriptions from "./pages/Subscriptions";
import CreateCategory from "./pages/CreateCategory";
import CreateFeature from "./pages/CreateFeature";
import CreateProduct from "./pages/CreateProduct";
import CreateFeatureMap from "./pages/CreateFeatureMap";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  // Wait until we've checked auth status before rendering
  if (isLoggedIn === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route path="/dashboard" element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            } />
            
            {/* Subscriptions pages */}
            <Route path="/subscriptions" element={
              <AdminLayout>
                <Subscriptions />
              </AdminLayout>
            } />
            
            {/* Subscription feature routes */}
            <Route path="/subscriptions/features/create" element={
              <AdminLayout>
                <CreateFeature />
              </AdminLayout>
            } />
            
            <Route path="/subscriptions/features/update/:id" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Update Feature</h1>
                  <p className="text-gray-500">Update feature form will be here.</p>
                </div>
              </AdminLayout>
            } />
            
            {/* Feature map routes */}
            <Route path="/subscriptions/feature-maps/create" element={
              <AdminLayout>
                <CreateFeatureMap />
              </AdminLayout>
            } />
            
            {/* Subscription product routes */}
            <Route path="/subscriptions/products/create" element={
              <AdminLayout>
                <CreateProduct />
              </AdminLayout>
            } />
            
            <Route path="/subscriptions/products/update/:id" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Update Product</h1>
                  <p className="text-gray-500">Update product form will be here.</p>
                </div>
              </AdminLayout>
            } />
            
            {/* Subscription category routes */}
            <Route path="/subscriptions/categories/create" element={
              <AdminLayout>
                <CreateCategory />
              </AdminLayout>
            } />
            
            <Route path="/subscriptions/categories/update/:id" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Update Category</h1>
                  <p className="text-gray-500">Update category form will be here.</p>
                </div>
              </AdminLayout>
            } />
            
            {/* User placeholder pages */}
            <Route path="/users" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Users Management</h1>
                  <p className="text-gray-500">User management page coming soon.</p>
                </div>
              </AdminLayout>
            } />
            
            <Route path="/settings" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Settings</h1>
                  <p className="text-gray-500">Settings page coming soon.</p>
                </div>
              </AdminLayout>
            } />
            
            <Route path="/profile" element={
              <AdminLayout>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                  <p className="text-gray-500">Profile page coming soon.</p>
                </div>
              </AdminLayout>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
