import { type ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * Directive E: Auth Guard Placeholder.
 * For this visual prototype, access is always granted.
 * When integrating with the backend, replace `isAuthenticated`
 * with a check against the `jwt` variable from the Postman
 * collection environment (e.g., via AuthContext or a token store).
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // TODO: Replace with real JWT auth check
    // const { jwt } = useAuth();
    // if (!jwt) return <Navigate to="/login" replace />;
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
