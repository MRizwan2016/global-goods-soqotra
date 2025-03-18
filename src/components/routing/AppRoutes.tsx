
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { routes } from "@/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const RouteElement = route.element;
        
        if (route.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRouteWrapper
                  requireAdmin={route.path.includes('/admin')} 
                  requiredFile={route.requiredFile as any}
                >
                  <RouteElement />
                </PrivateRouteWrapper>
              }
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              element={<RouteElement />}
            />
          );
        }
      })}
    </Routes>
  );
};

// This wrapper helps us capture the current location for redirects
const PrivateRouteWrapper = ({ 
  children, 
  requireAdmin, 
  requiredFile 
}: { 
  children: React.ReactNode; 
  requireAdmin?: boolean; 
  requiredFile?: any;
}) => {
  const location = useLocation();
  
  return (
    <PrivateRoute 
      requireAdmin={requireAdmin} 
      requiredFile={requiredFile}
    >
      {children}
    </PrivateRoute>
  );
};

export default AppRoutes;
