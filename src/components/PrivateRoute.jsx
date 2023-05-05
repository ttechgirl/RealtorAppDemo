import React from 'react'
import { Navigate, Outlet } from 'react-router';
import AuthStatus from '../ApiHooks/AuthStatus';
import Spinner from './spinner';


export default function PrivateRoute() {
    const {loggedIn, checkingStatus}=AuthStatus();
    if(checkingStatus){
        return <Spinner/>
    }
    
    //returns route nested in the private route(user profile) if logged In status is true, navigate to sign in page if false
   return loggedIn? <Outlet/> : <Navigate to='/sign-in'/>;
}
