"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const createOnrampTransaction = async( Provider:string, amount:number) => {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id){
        return {
            message: "Unauthorized Request"
        }
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            status:"Processing",
            token:token,
            provider:Provider,
            amount:amount * 100,
            startTime:new Date().toISOString(),
            userId:Number(session?.user?.id)
        }
    });
    return {
        message: "Done"
    }
}