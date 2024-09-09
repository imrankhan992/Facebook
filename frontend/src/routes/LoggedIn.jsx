import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from '@tanstack/react-router';
const LoggedIn = ({ component: Component }) => {
    const user = useSelector(state => state.user);
    return user ? <Navigate to={"/"}/>: <Component />;
}

export default LoggedIn
