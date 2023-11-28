import {NextResponse} from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrUser from '@/app/actions/getCurrUser';

export async function POST(request:Request) {
    const currUser = await getCurrUser();

    if(!currUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {title,description,imageSrc, category,roomCount,bathroomCount, guestCount, location, price} = body;

    Object.keys(body).forEach((value: any) =>{
        if(!body[value]){
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc, 
            category,
            roomCount,
            bathroomCount, 
            guestCount, 
            locationValue: location.value, 
            price: parseInt(price, 10),
            userId: currUser.id
        }
    });

    return NextResponse.json(listing);
}
