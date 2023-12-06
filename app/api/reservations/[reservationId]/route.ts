import { NextResponse } from "next/server";
import getCurrUser from "@/app/actions/getCurrUser";
import prisma from '@/app/libs/prismadb';

interface IParams{
    reservationId ?: string;
}

export async function DELETE(req: Request, {params}: {params: IParams}){
    const currUser = await getCurrUser();
    if(!currUser){
        return NextResponse.error();
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error("Invalid id");
    }

    const reservation = await prisma.reservations.deleteMany({
        where:{
            id: reservationId,
            OR:[
                {userId: currUser.id},
                {listing: {userId: currUser.id}}
            ]
        },
    })

    return NextResponse.json(reservation);
}


