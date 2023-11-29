import { NextResponse } from "next/server";
import getCurrUser from "@/app/actions/getCurrUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function POST(req:Request, {params}:{params:IParams}) {
    const currUser = await getCurrUser();
    if(!currUser){
        return NextResponse.error();
    }

    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid listing id');
    }

    let favorites = [...(currUser.favorites || [])];
    favorites.push(listingId);

    const user = await prisma.user.update({
        where:{
            id: currUser.id
        }, data:{
            favorites
        }
    })

    return NextResponse.json(user);
}

export async function DELETE(req: Request, {params}: {params: IParams}){
    const currUser = await getCurrUser();
    if(!currUser){
        return NextResponse.error();
    }
    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid listing id');
    }

    let favorites = [...(currUser.favorites || [])];
    favorites = favorites.filter(id => id !== listingId);

    const user = await prisma.user.update({
        where:{
            id: currUser.id
        },
        data:{
            favorites
        }
    })  
    
    return NextResponse.json(user);
}