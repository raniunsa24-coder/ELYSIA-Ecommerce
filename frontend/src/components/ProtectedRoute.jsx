import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ adminOnly = false }) {
  const token = localStorage.getItem("elysia-token");
  const storedUser = localStorage.getItem("elysia-user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;