"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function newPost(id: string, option: boolean, formData: FormData) {
  const note = formData.get("note")?.toString()!;

  const newNote = await db.post.create({
    data: {
      post: note,
      onlyMe: option,
      user: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  // console.log("new post >>>", newNote);
  redirect("/");
}
