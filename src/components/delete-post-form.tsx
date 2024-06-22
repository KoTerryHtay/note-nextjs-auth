"use client";

import { deletePost } from "@/actions/delete-post";
import { Button } from "./ui/button";

export default function DeletePostForm({
  noteId,
  onClose,
}: {
  noteId: number;
  onClose: () => void;
}) {
  return (
    <div className="py-3 space-y-2">
      <div className="text-black font-semibold">
        Are you sure want to delete this note?
      </div>
      <Button
        onClick={() => {
          deletePost(noteId);
          onClose();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
