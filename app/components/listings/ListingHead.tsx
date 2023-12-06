"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    imageSrc: string;
    title: string;
    id: string;
    locationValue: string;
    currUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({imageSrc, title, id, locationValue, currUser}) => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue)
  return (
    <>
        <Heading title={title} subtitle={`${location?.region}, ${location?.value}`}/>

        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
          <Image src={imageSrc} alt="image" fill className="object-cover w-full" />
          <div className="absolute top-5 right-5">
            <HeartButton currUser={currUser} listingId={id}/>
          </div>
        </div>
    </>
  )
}

export default ListingHead;