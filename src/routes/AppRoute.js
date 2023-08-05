import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../components/Home';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Login';
import TableUser from "../components/TableUser"
import NotFound from './NotFound';
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home></Home>} />
                <Route path='/login' element={<Login />} />
                <Route path='/user' element={
                    <PrivateRoute >
                        <TableUser />
                    </PrivateRoute>
                }/>
                <Route path='*' element={<NotFound/>} />
            </Routes>
            {/* <PrivateRoute path="/users">
                <TableUser />
            </PrivateRoute> */}
        </>
    )
}

export default AppRoute
