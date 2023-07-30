import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, adminPage }) => {
    if (!user) {
        return <Navigate to="/dang-nhap" replace />;
    }

    if (
        !user?.authorities?.some((item) => ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STORE_OWNER'].includes(item?.name)) &&
        adminPage
    ) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
