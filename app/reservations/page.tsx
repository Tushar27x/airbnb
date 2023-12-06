import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrUser from "../actions/getCurrUser";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async() => {
    const currUser = await getCurrUser();
    if(!currUser){
        return(
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="please login" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({authorId: currUser.id});

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your property"/>
            </ClientOnly>
        )
    }
    return (
        <Container>
            <ReservationsClient reservations={reservations} currUser={currUser} />
        </Container>
    )
}

export default ReservationsPage;