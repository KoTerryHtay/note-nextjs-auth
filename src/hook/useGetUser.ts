import { getUser } from "@/actions/get-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  userName: string;
  email: string;
};

export default function useGetUser(id: number) {
  const [user, setUser] = useState<User | null>();
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated" && +session.data.user.id !== id) {
    router.push("/");
  }

  useEffect(() => {
    async function get() {
      const user = await getUser(id);
      setUser(user);
      // console.log("ChangeNamePage >>>", user);
    }
    get();
  }, [id]);

  return user;
}
