
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { routes } from "@/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.private) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  {route.element}
                </PrivateRoute>
              }
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          );
        }
      })}
    </Routes>
  );
};

export default AppRoutes;
