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
import Home from "./components/home/Index"; // Assuming this is your home component
import { Toaster } from "./components/ui/sonner"; // Toaster component
import Login from "./pages/login";

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


const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />, 
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <Login />, 
});

// Add the home route to the root route
const routeTree = rootRoute.addChildren([homeRoute,loginRoute]);

// Create the router with the route tree
const router = createRouter({ routeTree });

// Get the root element and render the application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
         
        </RouterProvider>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  );
}
