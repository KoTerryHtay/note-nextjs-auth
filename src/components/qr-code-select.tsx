import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type bodyOption = {
  options: { icon: JSX.Element; name: string };
};

export default function QrCodeSelect({
  options,
  text,
  onSelect,
}: {
  options: {
    icon: JSX.Element;
    name: string;
  }[];
  text: "Body" | "Eyeframe" | "Eyeball";
  onSelect: (e: string) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className=" text-sm text-white font-semibold">{text}</div>
      <Select
        onValueChange={(e) => {
          onSelect(e);
          console.log("onValueChange >>>", e);
        }}
        defaultValue={"square"}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder={"square"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.name}>
                <span className="flex items-center gap-1">
                  {option.icon}
                  {option.name}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
