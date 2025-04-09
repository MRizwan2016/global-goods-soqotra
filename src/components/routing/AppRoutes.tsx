
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { routes } from "@/routes";
import { usePermissions } from "@/hooks/use-permissions";

const AppRoutes = () => {
  const { hasFilePermission } = usePermissions();
  
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
                  requiredFile={route.requiredFile}
                  requiredPermission={route.requiredPermission}
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
  requiredFile,
  requiredPermission
}: { 
  children: React.ReactNode; 
  requireAdmin?: boolean; 
  requiredFile?: string;
  requiredPermission?: string;
}) => {
  const location = useLocation();
  
  return (
    <PrivateRoute 
      requireAdmin={requireAdmin} 
      requiredFile={requiredFile}
      requiredPermission={requiredPermission}
    >
      {children}
    </PrivateRoute>
  );
};

export default AppRoutes;
