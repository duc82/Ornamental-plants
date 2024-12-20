import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { ProtectedRoute } from "./layouts/Protected";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { HelmetProvider } from "react-helmet-async";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import { Windmill } from "@windmill/react-ui";
import { UserProvider } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Account />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Windmill>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Windmill>
    </HelmetProvider>
  </StrictMode>
);
