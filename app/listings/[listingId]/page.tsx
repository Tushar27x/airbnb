import getCurrUser from "@/app/actions/getCurrUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams{
    listingId?: string;
}
const ListingPage = async({params}: {params:IParams})=>{
    const listing= await getListingById(params);
    const reservations = await getReservations(params);
    const currUser = await getCurrUser();
    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ListingClient 
                reservations={reservations}
                listing={listing}
                currUser = {currUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;