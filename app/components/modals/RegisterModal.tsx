"use client"

import axios from 'axios';
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


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email:'',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data)=>{
    setIsLoading(true);

    axios.post('/api/register',data)
      .then(()=>{
        registerModal.onClose();
      })
      .catch((err)=>{
        toast.error('Something went wrong');
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Welcome to Airbnb'
        subtitle='Create an account'
      />
      <Input 
        id='email' 
        label='Email' 
        disabled={isLoading} 
        register = {register} 
        errors = {errors} 
        required
      />
      <Input 
        id='name' 
        label='Name' 
        disabled={isLoading} 
        register = {register} 
        errors = {errors} 
        required
      />
      <Input 
        id='password' 
        label='Password' 
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
            Already have an account?
          </div>
          <div 
            onClick={registerModal.onClose}
            className='text-neutral-800  cursor-pointer hover:underline font-semibold'
          >
             Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen} 
      onClose={registerModal.onClose}     
      title='Register'
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
      onSubmit = {handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal;