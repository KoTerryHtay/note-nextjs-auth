"use client";

import getQrCode from "@/actions/get-qr-code";
import {
  bodyType,
  eyeType,
} from "@/app/user/[userId]/setting/change-qr-code/page";
import QRX from "@qr-x/react";
import { useEffect, useState } from "react";

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

export default function ProfileQrCode({ userId }: { userId: string }) {
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    async function getUser() {
      const user = await getQrCode(+userId);
      setUser(user);
    }
    getUser();
  }, [userId]);

  return (
    <div className="size-52 bg-white p-2 mx-36 rounded-lg">
      <QRX
        data={`http://localhost:3000/user/${userId}/`}
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
          body: (user?.qrCode?.body as bodyType) || "square",
          eyeball: (user?.qrCode?.eyeball as eyeType) || "square",
          eyeframe: (user?.qrCode?.eyeframe as eyeType) || "square",
        }}
      />
    </div>
  );
}
