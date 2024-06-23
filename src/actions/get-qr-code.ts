"use server";

import { db } from "@/db";

export default async function getQrCode(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      id: true,
      qrCode: true,
    },
  });

  return user;
}
