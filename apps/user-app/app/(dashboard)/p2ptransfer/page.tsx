import { SendMoney } from "../../../components/SendMoneyCard";
import { P2PTransactions } from "../../../components/P2PTransactions";
import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// helllo
async function getP2PSentTransactions({ userId }: { userId: string }) {
    const txns = await db.p2pTransfer.findMany({
        where: {
            fromUserId: Number(userId)
        }
    })
    return txns.map(tx  => ({
        amount: tx.amount,
        status: tx.status,
        timestamp: tx.timestamp,
        fromUserId: tx.fromUserId,
        toUserId: tx.toUserId
    }))
}

async function getP2PReceivedTransactions({ userId }: { userId: string }) {
    const to_txns = await db.p2pTransfer.findMany({
        where: {
            toUserId: Number(userId)
        }
    })
    return to_txns.map(tx => ({
        amount: tx.amount,
        status: tx.status,
        timestamp: tx.timestamp,
        fromUserId: tx.fromUserId,
        toUserId: tx.toUserId
    }))
}

export default async function () {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    const from_p2ptransfer = await getP2PSentTransactions({ userId });
    const to_p2ptransfer = await getP2PReceivedTransactions({ userId });
    return <div >
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
            <SendMoney />
            <div className="flex flex-col gap-4">
                <P2PTransactions transactions={from_p2ptransfer} txns_type={"Sent"} />
                <P2PTransactions transactions={to_p2ptransfer} txns_type={"Received"}/>
            </div>
        </div>
    </div>
}
