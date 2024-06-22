"use client";

import type { Post } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import EditPostForm from "./edit-post-form";
import CustomDialog from "./custom-dialog";
import DeletePostForm from "./delete-post-form";
import { useSession } from "next-auth/react";

import LockIcon from "./icons/LockIcon";
import GlobeIcon from "./icons/GlobeIcon";

import { MdDelete } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { BiSolidPencil } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface noteType {
  post: Post;
  user: {
    userName: string;
    id: number;
  };
}

export default function PostForm({ user, post }: noteType) {
  const [open, setOpen] = useState(false);
  const session = useSession();

  const { post: note, onlyMe, createdAt, id: noteId } = post;
  const { userName, id: userId } = user;

  return (
    <div className="bg-gray-100 mx-3 p-2 rounded-md my-1 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <Avatar>
            <AvatarImage
              src={`https://i.pravatar.cc/48?u=${user.id}`}
              alt="@shadCn"
            />
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadCn" /> */}
            <AvatarFallback className="text-black">{"user"}</AvatarFallback>
          </Avatar>

          <div className="fle flex-col">
            <div className="font-semibold flex">
              <span>
                {userName}
                {post.userId === Number(session.data?.user.id!) && (
                  <span className="text-sm text-gray-500">(You)</span>
                )}
              </span>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-0.5">
              {createdAt.toString()} ·{onlyMe ? <LockIcon /> : <GlobeIcon />}
            </div>
          </div>
        </div>
        {post.userId === Number(session.data?.user.id!) && (
          <div className="pr-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="text-gray-700 text-lg">
                <HiDotsHorizontal />
              </PopoverTrigger>
              <PopoverContent className="mx-2 p-2 space-y-1">
                <CustomDialog icon={<BiSolidPencil />} text="Edit">
                  <EditPostForm
                    userId={userId}
                    noteId={noteId}
                    note={note}
                    postOption={onlyMe}
                    onClose={() => setOpen(false)}
                  />
                </CustomDialog>

                <CustomDialog icon={<MdDelete />} text="Delete">
                  <DeletePostForm
                    noteId={noteId}
                    onClose={() => setOpen(false)}
                  />
                </CustomDialog>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      <div className="py-2">{note}</div>
    </div>
  );
}
