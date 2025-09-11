import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from '../dashboard/Sidenav'
import Navbar from '../dashboard/Navbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(window.innerWidth >= 600)

  const toggleDrawer = () => {
    setOpen((prev) => !prev)
  }

  React.useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 600)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Box
      sx={{ display: 'flex', overflowX: 'hidden' }}
      style={{ backgroundColor: '#EDEFF1', height: '100vh' }}
    >
      <Navbar onMenuClick={toggleDrawer} />
      <Sidenav open={open} />
      <Container
        component="main"
        maxWidth={false}   
        sx={{ flexGrow: 1, p: 3, mt: '64px', width: '100%' }}
      >
        <Outlet />
      </Container>
    </Box>
  )
}
