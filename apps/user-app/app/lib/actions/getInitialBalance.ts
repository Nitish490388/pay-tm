import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const getInitalBalance = async (): Promise<Number> => {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  const isBalanceExist = await prisma.balance.findFirst({
    where: {
      userId: Number(userId)
    },
  });

  if(isBalanceExist) {
    return isBalanceExist.amount;
  } else {
    const newBalance = await prisma.balance.create({
        data: {
            userId: Number(userId),
            amount: Number(0),
            locked: Number(0)
        }
    });

    return newBalance.amount;
  }
};
