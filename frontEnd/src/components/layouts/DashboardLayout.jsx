import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from '../dashboard/Sidenav'
import Navbar from '../dashboard/Navbar'
import Box from '@mui/material/Box'

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Box sx={{ display: 'flex' }} style={{ backgroundColor: '#EDEFF1',height: '100vh' }}>
      <Navbar onMenuClick={toggleDrawer} />
      <Sidenav open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
