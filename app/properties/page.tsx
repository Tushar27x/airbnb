import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrUser from "../actions/getCurrUser"
import PropertiesClient from "./PropertiesClient"
import getListings from "../actions/getListings"

const PropertiesPage =async () => {
    const currUser = await getCurrUser();

    if(!currUser) {
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    const listings = await getListings({userId:currUser.id});

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState title="No Properties found" subtitle="Looks like you don't have any properties" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient listings = {listings} currUser = {currUser} />
        </ClientOnly>
    )
}

export default PropertiesPage