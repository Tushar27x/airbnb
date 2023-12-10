"use client"
import React, { useCallback, useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currUser ?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({currUser}) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = useCallback(()=>{
        setOpen(value => !value);
    },[]);

    const onRent = useCallback(()=>{
        if(!currUser){
            return loginModal.onOpen();
        }
        rentModal.onOpen()

    },[rentModal,currUser, loginModal])

  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                Airbnb your home
            </div>
            <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {currUser? 
                    (
                        <>
                            <MenuItem label="My Trips" onClick={()=>{router.refresh();
                                router.push('/trips')}}/>
                            <MenuItem label="My Favorites" onClick={()=>{router.refresh();
                                router.push('/favorites')}} />
                            <MenuItem  label="My Reservations" onClick={()=>{router.refresh();
                                router.push('/reservations')}}/>
                            <MenuItem label="My properties" onClick={()=>{router.refresh();
                                router.push('/properties')}} />
                            <MenuItem  label="Airbnb my home" onClick={onRent}/>
                            <MenuItem label="Log out" onClick={()=>signOut({ callbackUrl: "/" })} />
                        </>
                    ):(
                        <>
                            <MenuItem onClick={loginModal.onOpen} label="Login"/>
                            <MenuItem onClick={registerModal.onOpen} label="Sign-up"/>
                        </>
                    )}
                    
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu;