import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../global/useAuth";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;