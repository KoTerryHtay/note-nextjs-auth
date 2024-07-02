"use client";

import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function CustomDialog({
  children,
  text,
  icon,
}: {
  children: React.ReactNode;
  text?: "Edit" | "Delete";
  icon: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer hover:bg-gray-400 rounded-lg px-2 py-1 w-full text-start flex items-center gap-1">
        {icon} {text}
      </DialogTrigger>
      <DialogContent className="w-64 h-64">
        <DialogHeader>
          <DialogTitle className="text-start">
            {text} {text && "Note"}
          </DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
