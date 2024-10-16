import { getServerSession } from "next-auth"
import { authOptions } from "../app/lib/auth";

export async function SingleTransaction({
    amount,
    timeStamp,
        toUserId,
        fromUserId,
}: {
    amount: number,
    timeStamp: Date,
    toUserId: number,
    fromUserId: number,
}) {

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const sent = userId == fromUserId;
 
        return (
            <div className={`p-4 flex items-center justify-center gap-2 border rounded-xl border-gray-00 bg-gray-200  ${sent ? `border-red-400` : `border-green-400`}`}>
            <span className={`${sent ? `text-red-500` : `text-green-500`}`}>{sent?<>- </>: <>+ </>} {amount}</span>
            <span>{toUserId}</span>
            <span>{timeStamp.toDateString()}</span>
        </div> 
        )
    
}