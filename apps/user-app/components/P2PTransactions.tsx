import { Card } from "@repo/ui/card"

interface Transaction {
    amount: number,
    status: string,
    timestamp: Date,
    fromUserId: number,
    toUserId: number
}

export const P2PTransactions = ({ transactions, txns_type }: {
    transactions: {
        amount: number,
        status: string,
        timestamp: Date,
        fromUserId: number,
        toUserId: number
    }[],
    txns_type: string
}) => {
    if (!transactions.length) {
        return <div>
            <Card title="Transcation History">
                <div>
                    No Tranasction History
                </div>
            </Card>
        </div>
    }
    return <div className="w-full">
        <Card title={txns_type === "Sent" ? "Sent Transactions" : "Received Transactions"}>
            <div>
                {transactions.map((t : Transaction) =>
                    <div className={`flex justify-between`}>
                        <div>
                            <div className="font-medium">
                                {txns_type === "Sent" ? "Sent INR" : "Received INR"}
                            </div>
                            <div className="font-extralight">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        {txns_type === "Sent" ? <div className={"text-red-500 font-bold text-lg"}>
                            - Rs {t.amount / 100}
                        </div> 
                        :
                        <div className={"text-green-500 font-bold text-lg"}>
                                + Rs {t.amount / 100}
                        </div>
                        }
                    </div>
                )}
            </div>
        </Card>
    </div>
}