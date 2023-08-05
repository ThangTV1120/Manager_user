import { Routes, Route } from "react-router-dom"
import React from 'react'
// import TableUser from '../components/TableUser';
import { useContext } from 'react';
import { useSelector } from "react-redux";
// import { useEffect } from 'react';
const PrivateRoute = (props) => {
    //Redux
    const user =useSelector(state=>state.user.account);
    //UseConText
    // const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <>
                You don't have permission to acess this route
            </>
        )
    }
    return (
        <>
           {props.children}
        </>
    )
}

export default PrivateRoute
