import checkAuthorization from "@/actions/check-authorization";
import { auth } from "@/auth";
import PostForm from "@/components/post-form";
import { db } from "@/db";
import { redirect } from "next/navigation";

interface Params {
  params: {
    userId: string;
  };
}

export default async function UserProfileDetailPage({ params }: Params) {
  const session = await auth();

  if (!session) redirect("/login");

  const user = await db.user.findUnique({
    where: {
      id: Number(params.userId),
    },
    select: {
      id: true,
      userName: true,
      post: true,
    },
  });

  const posts = user?.post.filter((posts) =>
    posts.userId === +session.user.id ? posts.id > 0 : posts.onlyMe === false
  );

  if (!user) return <div>User Not Found</div>;

  const userDetail = {
    id: user?.id,
    userName: user?.userName,
  };

  return (
    <div>
      <div>
        <div>UserProfile Detail Page {params.userId}</div>
      </div>
      <div>
        {posts?.length ? (
          posts.map((post) => (
            <PostForm key={post.id} user={userDetail} post={post} />
          ))
        ) : (
          <div>{user.userName} has no post</div>
        )}
      </div>
    </div>
  );
}
