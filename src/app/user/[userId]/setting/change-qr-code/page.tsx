"use client";

import QRX from "@qr-x/react";
import useGetUser from "@/hook/useGetUser";
import { useEffect, useState } from "react";
import QrCodeSelect from "@/components/qr-code-select";
import { FaCircle } from "react-icons/fa";
import { FaSquareFull } from "react-icons/fa";
import { TbSquareRoundedFilled } from "react-icons/tb";
import { IoLeafSharp } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { BsTriangleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import changeQr from "@/actions/change-qr-code";
import getQrCode from "@/actions/get-qr-code";

interface Params {
  params: {
    userId: string;
  };
}

export type bodyType =
  | "circle"
  | "square"
  | "diamond"
  | "triangle"
  | "heart"
  | "leaf";

export type eyeType = "circle" | "square" | "leaf" | "rounded";

const bodyOption = [
  { icon: <FaCircle />, name: "circle" },
  { icon: <FaSquareFull />, name: "square" },
  { icon: <FaDiamond />, name: "diamond" },
  { icon: <BsTriangleFill />, name: "triangle" },
  { icon: <FaHeart />, name: "heart" },
  { icon: <IoLeafSharp />, name: "leaf" },
];

const eyeOption = [
  { icon: <FaCircle />, name: "circle" },
  { icon: <FaSquareFull />, name: "square" },
  { icon: <IoLeafSharp />, name: "leaf" },
  { icon: <TbSquareRoundedFilled />, name: "rounded" },
];

type userType = {
  id: number;
  userName: string;
  qrCode: {
    id: number;
    body: string;
    eyeball: string;
    eyeframe: string;
    userId: number;
  } | null;
} | null;

export default function ChangeQrCode({ params }: Params) {
  const [body, setBody] = useState("square");
  const [eyeball, setEyeball] = useState("square");
  const [eyeframe, setEyeframe] = useState("square");

  const checkUser = useGetUser(+params.userId);

  if (!checkUser) return null;

  function changeQrCode() {
    changeQr(checkUser?.id!, body, eyeball, eyeframe);
  }

  return (
    <div>
      <div className="flex gap-2 px-5 py-2 items-center pb-10">
        <QrCodeSelect text="Body" options={bodyOption} onSelect={setBody} />
        <QrCodeSelect
          text="Eyeframe"
          options={eyeOption}
          onSelect={setEyeframe}
        />
        <QrCodeSelect
          text="Eyeball"
          options={eyeOption}
          onSelect={setEyeball}
        />
        <Button className="mt-5" onClick={changeQrCode}>
          Save
        </Button>
      </div>

      <div className="size-52 bg-white p-2 mx-36 rounded-lg">
        <QRX
          data={`http://localhost:3000/user/${checkUser.id}/`}
          gradient={{
            type: "linear",
            rotate: 45,
            colors: [
              {
                value: "#032445",
                stop: 0,
              },
              {
                value: "#0d074f",
                stop: 35,
              },
              {
                value: "#2a003d",
                stop: 100,
              },
            ],
          }}
          shapes={{
            body: body as bodyType,
            eyeball: eyeball as eyeType,
            eyeframe: eyeframe as eyeType,
          }}
        />
      </div>
    </div>
  );
}
