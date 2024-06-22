"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function checkAuthorization(id: number) {
  const session = await auth();

  if (!session) return null;

  if (+session.user.id !== id) {
    redirect("/");
  }
}
