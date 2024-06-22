import getAllPosts from "@/actions/get-all-posts";
import PostForm from "@/components/post-form";

export default async function Home() {
  const { isAuth, posts } = await getAllPosts();

  return (
    <div>
      {!isAuth ? (
        <div className="text-center pt-10 font-semibold">
          Please Login in to use
        </div>
      ) : (
        <div>
          HomePage
          <div>
            {posts?.length ? (
              posts.map((post) => (
                <PostForm user={post.user} post={post} key={post.id} />
              ))
            ) : (
              <div>No Post</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
