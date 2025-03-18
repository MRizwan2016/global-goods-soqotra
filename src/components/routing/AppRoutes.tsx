
import React from "react";
import { Route, Routes } from "react-router-dom";
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
                <PrivateRoute 
                  requireAdmin={route.path.includes('/admin')} 
                  requiredFile={route.requiredFile}
                >
                  <RouteElement />
                </PrivateRoute>
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

export default AppRoutes;
