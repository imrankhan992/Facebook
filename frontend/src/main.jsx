import "./index.css";
import "./styles/icons/icons.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import Home from "./components/home/Index";
import Login from "./pages/login";
import AuthRoute from "./routes/AuthRoute";
import { Toaster } from "./components/ui/sonner";
import ActivateEmailHome from "./components/home/Activate/Index";
import ResetIndex from "./components/Reset/Index";
import FindAccount from "./components/Reset/FindAccount";

// Create Redux store and React Query client
const store = createStore(rootReducer, composeWithDevTools());
const queryClient = new QueryClient();

// Create the root route with a layout component
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

// Home route (protected)
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <AuthRoute component={Home} requiresAuth={true} />, // Protected route
});

// Login route (public)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <AuthRoute component={Login} requiresAuth={false} />, // Public route
});
// Activate Email route (public) using the useParams hook
const activateEmailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activate/$token",
  component: () => (
    <AuthRoute component={ActivateEmailHome} requiresAuth={true} />
  ), // Public route
});
// reset  password
const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login/$somewhereId",
  component: () => <AuthRoute component={ResetIndex} requiresAuth={false} />,
});

// reset  password route with next page
const forgotPasswordFindAccount = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recover/initiate",
  component: () => <AuthRoute component={FindAccount} requiresAuth={false} />,
});
// Add routes to the root route
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  activateEmailRoute,
  forgotPasswordRoute,
  forgotPasswordFindAccount,
]);

// Create the router with the route tree
const router = createRouter({ routeTree });

// Get the root element and render the application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}
