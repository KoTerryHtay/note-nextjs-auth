"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/db";

export default async function deleteUser(id: number) {
  const session = await auth();
  if (!session) return null;

  if (id !== +session?.user.id) {
    return null;
  }

  const user = await db.user.delete({
    where: {
      id,
    },
  });

  // console.log("deleted user >>>", user);

  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}
