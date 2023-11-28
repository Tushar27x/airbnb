"use client"
import { Listing, Reservations } from "@prisma/client"
import {SafeUser} from '@/app/types'
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation ?: Reservations;
  onAction ?: (id: string) => void;
  disabled ?: boolean;
  actionLabel ?: string;
  actionId ?: string;
  currUser ?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currUser,
}) => {
  const router = useRouter();
  const {getByValue} = useCountries();


  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=>{
    if(disabled){
      return;
    }

    onAction?.(actionId);
  },[onAction, actionId, disabled]) 

  const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice;
    }

    return data.price;
  },[data,reservation]);

  const reservationDate = useMemo(()=>{
    if(!reservation){
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start,'PP')} - ${format(end,'PP')}`
  },[reservation])
  
  return (
    <div onClick={()=>router.push(`/listings/${data.id}`)}      className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image fill alt="listing" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition"/>
          
          <div className="absolute top-3 right-3">
            <HeartButton 
              listingId={data.id}
              currUser={currUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          ${price}
          {
            !reservation && (
              <div className="font-light">night</div>
            )
          }
          {onAction && actionLabel && (
            <Button 
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
        
      </div>
    </div>
  )
}

export default ListingCard