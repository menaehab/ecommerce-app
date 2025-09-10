import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from './dashboard/Sidenav'
export default function DashboardLayout() {
  return (
    <>
    <Sidenav>
      <Outlet />
    </Sidenav>
    </>
  )
}
