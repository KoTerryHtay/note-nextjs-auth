import Link from "next/link";
import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";
import { auth } from "@/auth";
import { FaUserFriends } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

export default async function UserProfile() {
  const session = await auth();

  return (
    <div>
      {!session?.user ? (
        <div className="space-x-2">
          <Link href={"/login"}>
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button variant="secondary" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/user">
            <Button variant="secondary" size="sm">
              <FaUserFriends />
            </Button>
          </Link>
          <Link href={`/user/${session.user.id}/create-new-post`}>
            <Button variant="secondary" size="sm">
              <IoIosCreate />
            </Button>
          </Link>
          <UserAvatar user={session.user} />
        </div>
      )}
    </div>
  );
}
