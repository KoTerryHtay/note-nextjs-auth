import checkAuthorization from "@/actions/check-authorization";
import NewPostForm from "@/components/new-post-form";
import { db } from "@/db";

interface Params {
  params: {
    userId: string;
  };
}

export default async function CreateNewPostPage({ params }: Params) {
  const { userId } = params;

  await checkAuthorization(+userId);

  const user = await db.user.findUnique({
    where: {
      id: Number(params.userId),
    },
  });

  if (!user) return <div>User Not Found</div>;

  return (
    <div className="py-5 px-10">
      <div className="pb-3">{user.userName}</div>
      <NewPostForm userId={userId} />
    </div>
  );
}
