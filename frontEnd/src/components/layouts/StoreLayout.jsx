import React from 'react'
import Navbar from '../store/Navbar'
import Footer from '../store/Footer'
import { Outlet } from 'react-router-dom'
export default function StoreLayout() {
  return (
    <>
    <Navbar />
      <Outlet />
    <Footer />
    </>
  )
}
