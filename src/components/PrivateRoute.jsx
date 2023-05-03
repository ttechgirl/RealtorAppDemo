import React from 'react'
import { Navigate, Outlet } from 'react-router';
import AuthStatus from '../ApiHooks/AuthStatus';

export default function PrivateRoute() {
    const {loggedIn, checkingStatus}=AuthStatus();
    if(checkingStatus){
        return <h3>Loading...</h3>
    }
    //returns route nested in the private route(user profile) if logged In status is true, navigate to sign in page if false
   return loggedIn? <Outlet/> : <Navigate to='/sign-in'/>;
}
