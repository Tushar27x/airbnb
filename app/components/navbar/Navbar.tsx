"use client"
import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'

interface NavbarProps {
    currUser?: SafeUser | null;
}
const Navbar:React.FC<NavbarProps> = ({currUser}) => {
  
  return (
    <nav className='fixed w-full shadow-sm z-10 bg-white'>
        <div className='py-4 border-b'>
            <Container>
                <div className='flex flex-row items-center justify-between'>
                    <Logo /> 
                    <Search /> 
                    <UserMenu currUser = {currUser}/>             
                </div>
            </Container>
            <Categories />
        </div>
    </nav>
  )
}

export default Navbar