import { getAllUsers } from "@/actions/get-all-users";
import CustomDialog from "@/components/custom-dialog";
import ProfileQrCode from "@/components/profile-qr-code";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IoQrCode } from "react-icons/io5";

export default async function UserPage() {
  const { userId, users } = await getAllUsers();

  return (
    <div className="p-4">
      <div className="font-semibold">User Page</div>

      {users.map((user) => (
        <div key={user.id} className="flex">
          <Link
            href={`/user/${user.id}`}
            className="bg-gray-100 rounded-md my-1 flex  gap-2 hover:cursor-pointer hover:bg-gray-500 hover:text-white items-center justify-between p-3 w-full"
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage
                  src={`https://i.pravatar.cc/48?u=${user.id}`}
                  alt="@shadCn"
                />
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadCn" /> */}
                <AvatarFallback className="text-black">
                  {user.userName?.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>{user.userName}</div>
              {user.id === userId && <div className="text-sm">(You)</div>}
            </div>
            <div>{user._count.post} posts</div>
          </Link>
          <div className="w-fit bg-gray-100 mx-1 rounded-md my-1 flex gap-2 hover:cursor-pointer hover:bg-gray-500 hover:text-white items-center p-3">
            <CustomDialog icon={<IoQrCode />}>
              <div className="w-fit ">
                <ProfileQrCode userId={user.id.toString()!} />
              </div>
            </CustomDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
