"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function changeQr(
  userId: number,
  body: string,
  eyeball: string,
  eyeframe: string
) {
  console.log(userId, body, eyeball, eyeframe);

  const checkUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!checkUser) return null;

  const user = await db.qrCode.upsert({
    create: {
      body,
      eyeball,
      eyeframe,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    update: {
      body,
      eyeball,
      eyeframe,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    where: {
      userId,
    },
  });

  console.log("change qr code >>>", user);

  redirect(`http://localhost:3000/user/${user.userId}`);
}
