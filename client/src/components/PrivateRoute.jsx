import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element, isLoggedIn }) {
    return isLoggedIn ? element : <Navigate to="/" />;
}
