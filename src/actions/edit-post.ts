"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editPost(
  id: number,
  option: boolean,
  formData: FormData
) {
  const note = formData.get("note")?.toString()!;

  const editNote = await db.post.update({
    where: {
      id,
    },
    data: {
      post: note,
      onlyMe: option,
    },
  });

  // console.log("edit post >>>", editNote);

  redirect("/");

  // console.log("edit post >>>", id, option, note);
}
