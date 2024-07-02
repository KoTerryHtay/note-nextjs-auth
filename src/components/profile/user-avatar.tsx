"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useState } from "react";
import userLogout from "@/actions/user-logout";
import { User } from "next-auth";
import PersonIcon from "../icons/PersonIcon";
import GearIcon from "../icons/GearIcon";
import ExitIcon from "../icons/ExitIcon";
import { IoQrCode } from "react-icons/io5";
import CustomDialog from "../custom-dialog";
import ProfileQrCode from "../profile-qr-code";
import CameraSqScanner from "../camera-sq-scanner";

export default function UserAvatar({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  if (!user) return null;

  return (
    <div className="pr-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="text-gray-700 text-lg">
          <Avatar>
            <AvatarImage
              src={`https://i.pravatar.cc/48?u=${user.id}`}
              alt="@shadCn"
            />
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadCn" /> */}
            <AvatarFallback className="text-black">
              {user.name?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="mx-5 py-3 space-y-3">
          <div className="flex items-center gap-3 ml-7">
            <Avatar>
              <AvatarImage
                src={`https://i.pravatar.cc/48?u=${user.id}`}
                alt="@shadCn"
              />
              <AvatarFallback className="text-black">
                {user.name?.at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="">{user.name}</div>

            <div className="w-fit">
              <CustomDialog icon={<IoQrCode />}>
                <div className="w-fit">
                  <ProfileQrCode userId={user.id!} />
                </div>
              </CustomDialog>
            </div>

            <CameraSqScanner onClose={onClose} />
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href={`/user/${user.id}`}
              className="bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-500 hover:text-white px-3 py-2 flex gap-1 items-center"
              onClick={onClose}
            >
              <PersonIcon /> Profile
            </Link>
            <Link
              href={`/user/${user.id}/setting`}
              className="bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-500 hover:text-white px-3 py-2 flex gap-1 items-center"
              onClick={onClose}
            >
              <GearIcon /> Setting
            </Link>
            <button
              className="bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-500 hover:text-white px-3 py-2 text-left flex gap-1 items-center"
              onClick={() => {
                userLogout();
                onClose();
              }}
            >
              <ExitIcon /> LogOut
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
