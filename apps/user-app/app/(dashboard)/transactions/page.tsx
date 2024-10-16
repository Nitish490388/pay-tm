import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { SingleTransaction } from "../../../components/SingleTransaction";


async function getP2pTransaction() {
    const session = await getServerSession(authOptions);
    
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ],
        },
        include: {
            fromUser: true,
            toUser: true
        }
    });
    return txns.map(t => ({
        amount: t.amount,
        timeStamp: t.timestamp,
        toUserId: t.toUserId,
        fromUserId: t.fromUserId,
    }))
}
export  default async function() {
     const data = await getP2pTransaction();
    
    return <div className=" w-full h-full flex flex-col items-center overflow-y-auto space-y-3 m-5">
        
        {
            data.map((item, i) => (
                <SingleTransaction amount={item.amount} timeStamp={item.timeStamp} toUserId={item.toUserId} fromUserId={item.fromUserId}/>
            ))
        }
    </div>
}