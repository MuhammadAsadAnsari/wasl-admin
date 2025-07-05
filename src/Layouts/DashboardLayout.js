import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Nav from '../components/Nav'
import { checkToken } from '../auth/auth'

const DashboardLayout = ({children}) => {
  const token = checkToken();
  return token ?
  (
   <>
   <Nav children={children}>
    <Outlet/>
   </Nav>
   </>
  ): <Navigate to="/login" replace />
}

export default DashboardLayout