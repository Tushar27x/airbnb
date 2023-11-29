"use client"

import { SafeListing, SafeUser } from "@/app/types"
import { Reservations } from "@prisma/client"


interface ListingClientProps {
    resevations ?: Reservations[]
    listing: SafeListing & { user : SafeUser };
    currUser: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({resevations, listing, currUser}) => {
    
    return (
        <div>ListingClient</div>
    )
}

export default ListingClient