import React from 'react'
import { Navigate, Outlet } from 'react-router';
import AuthStatus from '../ApiHooks/AuthStatus';
import Spinning from './Spinning';


export default function PrivateRoute() {
    const {loggedIn, checkingStatus}=AuthStatus();
    if(checkingStatus){
        return <Spinning/>
    }
    
    //returns route nested in the private route(user profile) if logged In status is true, navigate to sign in page if false
   return loggedIn? <Outlet/> : <Navigate to='/sign-in'/>;
}
