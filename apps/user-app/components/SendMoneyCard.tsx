"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import Loading from "../app/(dashboard)/loading";

export const SendMoney = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading,setLoading] = useState(false)
    return <div className="w-full">
            <Card title="Send">
                <div>
                    <TextInput label="Phone Number" placeholder="enter senders number" onChange={(value) => {
                        setNumber(value);
                    }} />
                    <TextInput label="Amount" placeholder="enter Amount" onChange={(value) => {
                        setAmount(value);
                    }} />
                    <Center>
                        <div className="pt-4">
                            <Button onClick={async()=>{
                                console.log("click");
                                // Server action
                                setLoading(true);
                                await p2pTransfer(number, Number(amount) * 100 );
                                setLoading(false);
                                window.location.reload(); // for Now 
                            }}>
                                {!loading? "Send" : <Loading/>}
                            </Button>
                        </div>
                    </Center>
                </div>
            </Card>
        {/* {JSON.stringify(number)}
        {JSON.stringify(amount)} */}
    </div>
}

