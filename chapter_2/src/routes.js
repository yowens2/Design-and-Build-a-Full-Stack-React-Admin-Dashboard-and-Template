import { Suspense, Fragment, lazy } from "react";
import { Route, Navigate } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout";
import MainLayout from "layouts/MainLayout";
import LandingView from "views/LandingView";
import LoadingScreen from "components/LoadingScreen";

export const renderRoutes = (routes = [], Layout = Fragment) => {
  return routes.map((route, i) => {
    if (route.routes) {
      if (route.layout) Layout = route.layout;

      if (route.path) {
        return (
          <Route key={i} path={route.path} element={<Layout />}>
            {renderRoutes(route.routes, Layout)}
          </Route>
        );
      } else {
        return (
          <Route key={i} element={<Layout />}>
            {renderRoutes(route.routes, Layout)}
          </Route>
        );
      }
    } else {
      const Component = route.component;
      if (route.layout) Layout = route.layout;

      if (route.path) {
        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Component />
              </Suspense>
            }
          />
        );
      } else {
        return (
          <Route
            key={i}
            index
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Component />
              </Suspense>
            }
          />
        );
      }
    }
  });
};

const routes = [
  {
    layout: MainLayout,
    routes: [
      {
        path: "/",
        component: LandingView,
      },
      {
        path: "/404",
        component: lazy(() => import("views/NotFoundView")),
      },
      {
        path: "/403",
        component: lazy(() => import("views/NotAuthorizedView")),
      },
      {
        path: "/login",
        component: lazy(() => import("views/LoginView")),
      },
      {
        path: "/register",
        component: lazy(() => import("views/RegisterView")),
      },
    ],
  },
  {
    layout: DashboardLayout,
    routes: [
      {
        path: "/home",
        component: lazy(() => import("views/DashboardView")),
      },
      {
        path: "/account",
        component: lazy(() => import("views/AccountView")),
      },
    ],
  },
  {
    path: "/projects",
    layout: DashboardLayout,
    routes: [
      {
        component: lazy(() => import("views/ProjectsView")),
      },
      {
        path: ":projectId",
        component: lazy(() => import("views/ProjectView")),
      },
    ],
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
];

export default routes;
