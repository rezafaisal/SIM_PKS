import { Navigate } from "react-router-dom";
import { useAuth } from "features/auth";

const ProtectedRoute = ({ children, requiredPages, requiredLevel }: any) => {
  const { creds } = useAuth();
  const accessPages = Array.isArray(creds?.access_page)
    ? creds?.access_page
    : [];

  const hasAccess = requiredPages.some((page: any) =>
    accessPages?.includes(page)
  );

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }
  if (requiredLevel) {
    if (creds?.level.name != "Admin") {
      return <Navigate to="/" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
