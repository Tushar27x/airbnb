import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrUser from "../actions/getCurrUser";
import Container from "../components/Container";
import getFavorites from "../actions/getFavorites";
import FavoriteClient from "./FavoriteClient";


const FavoritesPage = async() => {
    const currUser = await getCurrUser();
    const favoriteListings = await getFavorites();
    if(!currUser) {
        return(
            <Container>
                <EmptyState title="Unauthorized" subtitle="Please Log In" />
            </Container>
        )
    }


    if(favoriteListings.length === 0){
        return(
            <ClientOnly>
                <EmptyState title="No Favorites found" subtitle="Looks like you have no favorite listings" />
            </ClientOnly>
        )
    }
    return (
        <Container>
            <FavoriteClient favoriteListings={favoriteListings} currUser={currUser} />
        </Container>
    )
}

export default FavoritesPage;