import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrUser from "@/app/actions/getCurrUser";

export async function POST(req: Request){
    const currUser = await getCurrUser();
    if(!currUser){
        return NextResponse.error();
    }

    const body = await req.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if( !listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data:{
            reservations: {
                create:{
                    userId: currUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }

            }
        }
    });

    return NextResponse.json(listingAndReservation);
}