"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(noteId: number) {
  const deleteNote = await db.post.delete({
    where: {
      id: noteId,
    },
  });

  // console.log("delete post >>>", deleteNote);

  revalidatePath("/");
  redirect("/");
}
