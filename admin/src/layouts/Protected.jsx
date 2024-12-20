import GlobalHistory from "@/components/GlobalHistory";
import { useUser } from "@/contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return (
    <>
      <GlobalHistory />
      <Outlet />
    </>
  );
};
