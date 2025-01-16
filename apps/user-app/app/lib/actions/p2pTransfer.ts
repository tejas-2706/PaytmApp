"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import db from "@repo/db/client"

export const p2pTransfer = async (number: string, amount: number) => {
    const session = await getServerSession(authOptions);
    const fromUser = session?.user?.id
    if (!session || !session?.user || !session?.user?.id) {
        return {
            message: "Unauthorized"
        }
    }
    const toUser = await db.user.findFirst({
        where: {
            number: number
        }
    });
    if (!toUser) {
        return {
            message: "User does not exists!!"
        }
    }
    try {
        await db.$transaction(async (db) => {
            await db.$queryRaw`SELECT * FROM "Balance" WHERE "userId"= ${Number(fromUser)} FOR UPDATE`;
            const fromBalance = await db.balance.findUnique({
                where: {
                    userId: Number(fromUser)
                }
            })
            if (!fromBalance || fromBalance.amount <= amount) {
                throw new Error("Insufficient Balance")
            }
            await db.balance.update({
                where: {
                    userId: Number(fromUser)
                },
                data: {
                    amount: { decrement: amount }
                }
            })

            await db.balance.update({
                where: {
                    userId: toUser.id
                    },
                data: {
                    amount: { increment: amount }
                }
            });

            await db.p2pTransfer.create({
                data :{
                    fromUserId: Number(fromUser),
                    toUserId: toUser.id,
                    amount,
                    status:"Success",
                    timestamp:new Date()
                }
            })
        });
        console.log("Success");
    } catch (error) {
        console.log(error);
        console.log("Failed");
    }
}
