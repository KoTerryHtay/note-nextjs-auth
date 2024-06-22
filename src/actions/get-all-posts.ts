"use server";

import { auth } from "@/auth";
import { db } from "@/db";

export default async function getAllPosts() {
  const session = await auth();

  if (!session)
    return {
      isAuth: false,
      posts: null,
    };

  const allPosts = await db.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  const posts = allPosts.filter((posts) =>
    posts.userId === +session.user.id ? posts.id > 0 : posts.onlyMe === false
  );

  return {
    isAuth: true,
    posts,
  };
}
