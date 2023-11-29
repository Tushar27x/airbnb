import getCurrUser from "@/app/actions/getCurrUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams{
    listingId?: string;
}
const ListingPage = async({params}: {params:IParams})=>{
    const listing= await getListingById(params);
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
                listing={listing}
                currUser = {currUser}/>
        </ClientOnly>
    )
}

export default ListingPage;