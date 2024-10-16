import express from "express";
import db from "../../../packages/db/src";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
    };



    try {   
        const userBalance = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId)
            },
        })

        const balanceId = userBalance?.id;
        
        const transaction = await db.onRampTransaction.findFirst({
            where: {
              token: paymentInformation.token
            },
          });

          const amount = transaction?.amount;

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        
                        increment: Number(amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({         
            msg: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3005, () => {
    console.log("bank webhook is listening on 3005");
    
});