import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedIn = () => {
    const user = useSelector(state => state.user);
    return user ? <Navigate to="/" /> : <Outlet />;
}

export default LoggedIn
