import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma  from '@/app/libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrUser() {
    try{
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }

        const currUser = await prisma.user.findUnique({where:{email: session.user.email as string}});

        if(!currUser){
            return null;
        }

        return currUser;
    }catch(err){
        return null;
    }
}
