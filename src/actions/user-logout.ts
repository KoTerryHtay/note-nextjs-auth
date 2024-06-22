"use server";

import { signOut } from "@/auth";

export default async function userLogout() {
  await signOut({
    redirectTo: "/",
    redirect: true,
  });
}
