
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { routes } from "@/routes";
import { useAuth } from "@/hooks/use-auth";

const AppRoutes = () => {
  // Use auth context directly instead of usePermissions
  const { currentUser, isAdmin } = useAuth();
  
  return (
    <Routes>
      {routes.map((route, index) => {
        const RouteElement = route.element;
        
        // Determine if this route should require a specific section permission
        let requiredPermission: string | undefined;
        if (route.path.startsWith('/master')) {
          requiredPermission = 'masterData';
        } else if (route.path.startsWith('/data-entry')) {
          requiredPermission = 'dataEntry';
        } else if (route.path.startsWith('/reports')) {
          requiredPermission = 'reports';
        } else if (route.path.startsWith('/accounts')) {
          requiredPermission = 'accounting';
        } else if (route.path.includes('/admin/control-panel')) {
          requiredPermission = 'controlPanel';
        }
        
        if (route.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRouteWrapper
                  requireAdmin={route.path.includes('/admin') && !route.path.includes('/admin/login')} 
                  requiredFile={route.requiredFile}
                  requiredPermission={route.requiredPermission || requiredPermission}
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
