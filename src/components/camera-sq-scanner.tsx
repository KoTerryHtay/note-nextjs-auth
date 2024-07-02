"use client";

import { MdQrCodeScanner } from "react-icons/md";
import { Scanner } from "@yudiel/react-qr-scanner";
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllUsers } from "@/actions/get-all-users";

type usersType = {
  id: number;
  userName: string;
  _count: {
    post: number;
    qrCode: number;
  };
};

export default function CameraSqScanner({ onClose }: { onClose: () => void }) {
  const [users, setUser] = useState<usersType[]>();
  const [id, setId] = useState("");

  useEffect(() => {
    async function get() {
      const { users } = await getAllUsers();
      setUser(users);
    }
    get();
  }, []);

  // console.log("users >>>", users);

  const searchUser = users?.find((user) => user.id === +id);

  const isExit = !!id && !searchUser;

  // console.log("camera qr code searchUser >>>", searchUser);

  // console.log("camera qr code id >>>", +id);

  return (
    <div className="w-fit">
      <Dialog>
        <DialogTrigger className="hover:cursor-pointer hover:bg-gray-400 rounded-lg px-2 py-1 w-full text-start flex items-center gap-1">
          <MdQrCodeScanner />
        </DialogTrigger>
        <DialogContent className="w-full h-full">
          <DialogHeader>
            <DialogTitle className="text-start pb-10 space-y-2">
              <div>Scanner</div>
              <div>
                {searchUser && (
                  <DialogClose asChild>
                    <Link
                      //https://d19d-37-111-46-105.ngrok-free.app/user/3
                      href={`https://d19d-37-111-46-105.ngrok-free.app/user/${searchUser?.id}`}
                      className="underline hover:cursor-pointer"
                      onClick={onClose}
                    >
                      user name : {searchUser.userName}
                    </Link>
                  </DialogClose>
                )}
                {(Number.isNaN(id) || isExit) && (
                  <div>User Not Found Or Invalid Qr code</div>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              <Scanner
                onScan={(e) => {
                  // console.log(e.at(0)?.rawValue);
                  setId(e.at(0)?.rawValue || "");
                }}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
