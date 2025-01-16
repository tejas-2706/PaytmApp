import express from "express"
import db from "@repo/db/client"
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    const isValid = await db.onRampTransaction.findUnique({
        where: {
            token: paymentInformation.token
        }
    });
    if(isValid?.status == "Success"){
        return res.status(409).json({
            message: "Transaction already Added/Successfully Processed!!"
        });
    }
    if(isValid?.amount != Number(paymentInformation.amount)) {
        return res.status(409).json({
            message: "Mismatch Amount that of DB"
        });
    }
    // console.log(paymentInformation);
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.status(200).json({
            message: "captured"
        })


    } catch (error) {
        res.status(411).json({
            message: "Error Occured"
        })
    }
});

app.listen(3003);

