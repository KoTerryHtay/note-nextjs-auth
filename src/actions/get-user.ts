"use server";

import { db } from "@/db";
import { cache } from "react";

export const getUser = cache(async function getUser(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      userName: true,
    },
  });

  return user;
});
