import Container from '@mui/material/Container'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
export default function Footer() {
  return (
   <div className='bg-black text-white'>
    <Container>
        <div className='flex flex-col md:flex-row justify-between items-center py-4'>
        <div className='opacity-50'>
          <p>Copyright © {new Date().getFullYear()} Tech. All rights reserved.</p>
        </div>
        <div className='flex gap-2'>
          <FacebookIcon className='cursor-pointer opacity-50 hover:opacity-100 hover:text-blue-500 transition-all duration-300' />
          <InstagramIcon className='cursor-pointer opacity-50 hover:opacity-100 hover:text-blue-500 transition-all duration-300' />
        </div>            
        </div>
    </Container>
   </div>
  )
}
