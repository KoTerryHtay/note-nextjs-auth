"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function getAllUsers() {
  const session = await auth();

  if (!session) return redirect("/login");

  const users = await db.user.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      userName: true,
      _count: true,
    },
    // include: {
    //   _count: true,
    // },
  });

  return { userId: +session.user.id, users };
}
