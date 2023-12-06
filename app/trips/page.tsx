import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrUser from "../actions/getCurrUser"
import getReservations from "../actions/getReservations"
import TripsClient from "./TripsClient"

const TripsPage =async () => {
    const currUser = await getCurrUser();

    if(!currUser) {
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({userId:currUser.id});

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState title="No trips found" subtitle="Looks like you haven't rerved any trips" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient reservations = {reservations} currUser = {currUser} />
        </ClientOnly>
    )
}

export default TripsPage