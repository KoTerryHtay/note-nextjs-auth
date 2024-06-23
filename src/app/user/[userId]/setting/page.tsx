"use client";

import deleteUser from "@/actions/delete-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Params {
  params: {
    userId: string;
  };
}

export default function SettingPage({ params }: Params) {
  return (
    <div>
      <div className="p-3">Setting Page</div>
      <div className="flex flex-col gap-1">
        <Link
          href={`/user/${params.userId}/setting/change-name`}
          className="bg-gray-100 mx-3 rounded-md my-1 hover:cursor-pointer hover:bg-gray-500 hover:text-white p-3"
        >
          Change User Name
        </Link>
        <Link
          href={`/user/${params.userId}/setting/change-password`}
          className="bg-gray-100 mx-3 rounded-md my-1 hover:cursor-pointer hover:bg-gray-500 hover:text-white p-3"
        >
          Change User Password
        </Link>
        <Link
          href={`/user/${params.userId}/setting/change-qr-code`}
          className="bg-gray-100 mx-3 rounded-md my-1 hover:cursor-pointer hover:bg-gray-500 hover:text-white p-3"
        >
          Change User Profile Qr-Code
        </Link>
        <Button
          variant={"destructive"}
          className="mx-3 rounded-md my-1 p-3"
          onClick={() => deleteUser(+params.userId)}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
