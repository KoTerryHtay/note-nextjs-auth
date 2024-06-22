"use client";

import { newPost } from "@/actions/new-post";
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
import GlobeIcon from "./icons/GlobeIcon";
import LockIcon from "./icons/LockIcon";

export default function NewPostForm({ userId }: { userId: string }) {
  const [onlyMe, setOnlyMe] = useState(false);

  return (
    <form
      action={(form) => newPost(userId, onlyMe, form)}
      className="space-y-2"
    >
      <label htmlFor="note"></label>
      <Textarea name="note" id="note" rows={12} placeholder="Note" required />
      <div className="flex justify-between items-center">
        <Select
          onValueChange={(e) => {
            setOnlyMe(e === "onlyMe" ? true : false);
            console.log("onValueChange >>>", e);
          }}
          defaultValue={"public"}
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
        <Button>Add Note</Button>
      </div>
    </form>
  );
}
