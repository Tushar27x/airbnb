"use client"
import React from 'react'
import Container from './Container'
import Image from 'next/image'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
const Navbar = () => {
  return (
    <nav className='fixed w-full shadow-sm z-10 bg-white '>
        <div className='py-4 border-b'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo /> 
                    <Search /> 
                    <UserMenu />             
                </div>
            </Container>
        </div>
    </nav>
  )
}

export default Navbar