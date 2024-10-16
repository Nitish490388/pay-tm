import { getInitalBalance } from "../../lib/actions/getInitialBalance"

export default async function() {

    const userBalance = await getInitalBalance();

    return <div>
        Dashboard
        
    </div>
}