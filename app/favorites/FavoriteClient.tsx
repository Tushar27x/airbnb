import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types"

interface FavoriteClientProps{
    favoriteListings: SafeListing[]
    currUser?: SafeUser | null;
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({favoriteListings, currUser}) => {
  return (
    <Container>
        <Heading title="Favorites" subtitle="Lists of place you like" />
        <div className='grid mt-10 
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      '>
        {
          favoriteListings.map(listing =>(
            <ListingCard key={listing.id} currUser={currUser} data={listing} />
          ))
        }
      </div>
    </Container>
  )
}

export default FavoriteClient