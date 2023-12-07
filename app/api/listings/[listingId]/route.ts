import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrUser from "@/app/actions/getCurrUser";

interface IParams {
    listingId?: string;
}

export async function DELETE(req:Request,{params}:{params:IParams}) {
    try{
        const currUser = getCurrUser();
        if(!currUser){
            return NextResponse.error();
        }

        const {listingId} = params;
        if(!listingId || typeof listingId !== 'string'){
            throw new Error("Invalid Id")
        }

        const listing = await prisma.listing.deleteMany({where:{id:listingId, userId:currUser.id}})
        
        return NextResponse.json(listing);
    }catch(err: any){
        throw new Error(err);
    }
}