import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  element: Component,
  isAuthenticated,
  user,
  token,
}) {
  return isAuthenticated ? (
    <Component user={user} token={token} />
  ) : (
    <Navigate to="/login" replace />
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  token: PropTypes.string,
};
