"use client"

import axios from 'axios';
import {signIn} from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState, useCallback, MouseEvent } from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            Email: '',
            Password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        
        signIn('credentials',{
            ...data,
            redirect: false
        }).then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Logged In");
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
        <Heading 
            title='Welcome back'
            subtitle='Log in to your account'
        />
        <Input 
            id='email' 
            label='email' 
            disabled={isLoading} 
            register = {register} 
            errors = {errors} 
            required
        />
        <Input 
            id='password' 
            label='password' 
            type='password'
            disabled={isLoading} 
            register = {register} 
            errors = {errors} 
            required
        />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
        <hr />
        <Button label='Continue with Google' outline icon={FcGoogle} onClick={()=>{}}/>

        <Button label='Continue with GitHub' outline icon={AiFillGithub} onClick={()=>{}}/>
        
        <div className='text-neutral-500 text-center mt-4 font-light'>
            <div className='flex flex-row justify-center items-center gap-2'>
            <div>
                New to Airbnb?
            </div>
            <div 
                onClick={toggle}
                className='text-neutral-800  cursor-pointer hover:underline font-semibold'
            >
                Create an account
            </div>
            </div>
        </div>
        </div>
    )
    return (
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen} 
        onClose={loginModal.onClose}     
        title='Login'
        body={bodyContent}
        footer={footerContent}
        actionLabel='Continue'
        onSubmit = {handleSubmit(onSubmit)}
        />
    )
}

export default LoginModal;