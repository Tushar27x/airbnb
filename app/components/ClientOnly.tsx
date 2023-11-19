"use client"
import React, { useEffect, useState } from 'react'
interface ClientOnlyProps{
    children: React.ReactNode
}
const ClientOnly : React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMouteted, setHasMouted] = useState(false);

    useEffect(()=>{
        setHasMouted(true);
    },[hasMouteted]);

    if(!hasMouteted){
        return null;
    }
    return (
    <>
        {children}
    </>
  )
}

export default ClientOnly;