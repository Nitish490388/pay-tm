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

    const sent = userId === fromUserId;
    const recieved = userId === toUserId;

    if(sent) {
        return (
            <div className="p-4 border rounded-xl border-gray-00 bg-gray-200 ">
            <span className="text-red-500">- {amount}</span>
            <span>{toUserId}</span>
            <span>{timeStamp.toDateString()}</span>
        </div> 
        )
    }
    
    return <div className="w-[350px] p-4 border rounded-xl border-gray-400 bg-gray-200 flex justify-around ">
        <span className="text-green-500 font-bold">+ {amount}</span>
        <span>from {fromUserId}</span>
        <span className="text-gray-500">{timeStamp.toLocaleTimeString()}</span>
    </div>
}