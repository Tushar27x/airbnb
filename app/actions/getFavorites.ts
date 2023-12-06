import prisma from '@/app/libs/prismadb'
import getCurrUser from './getCurrUser';
export default async function getFavorites(){
    try{
        const currUser = await getCurrUser();
        if(!currUser){
            return [];
        }
        const favorites = await prisma.listing.findMany({
            where:{
                id: {
                    in: [...(currUser?.favorites) || []]
                }
            }
        });

        const safeFavorites = favorites.map(favorite =>({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
        }))


        return safeFavorites;
    }catch(err: any){
        throw new Error(err);
    }
}