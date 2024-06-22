"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { editPost } from "@/actions/edit-post";
import GlobeIcon from "./icons/GlobeIcon";
import LockIcon from "./icons/LockIcon";

export default function EditPostForm({
  userId,
  noteId,
  note,
  onClose,
  postOption,
}: {
  userId: number;
  noteId: number;
  note: string;
  onClose: () => void;
  postOption: boolean;
}) {
  const [onlyMe, setOnlyMe] = useState(postOption);
  // console.log(noteId);

  return (
    <form
      action={(form) => {
        editPost(noteId, onlyMe, form);
      }}
      className="space-y-2"
    >
      <label htmlFor="note"></label>
      <Textarea
        className="text-black"
        name="note"
        id="note"
        rows={12}
        placeholder="Note"
        defaultValue={note ?? ""}
        required
      />
      <div className="flex justify-between items-center">
        <Select
          onValueChange={(e) => {
            setOnlyMe(e === "onlyMe" ? true : false);
            // console.log("onValueChange >>>", e);
          }}
          defaultValue={postOption ? "onlyMe" : "public"}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder={"public"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"public"}>
                <span className="flex items-center gap-1">
                  <GlobeIcon /> public
                </span>
              </SelectItem>
              <SelectItem value={"onlyMe"}>
                <span className="flex items-center gap-1">
                  <LockIcon /> only me
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit" onClick={onClose}>
          Add Note
        </Button>
      </div>
    </form>
  );
}
