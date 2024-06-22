"use server";

import { db } from "@/db";
import { z } from "zod";
import { comparePassword, hashPassword } from ".";
import { redirect } from "next/navigation";

const SignUpFormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export type SignUpFormState = {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
  };
  message?: string;
};

export default async function changePassword(
  id: number,
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = SignUpFormSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  console.log("changePassword >>>", id, result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      message: "something wrong",
    };
  }

  const hashNewPass = await hashPassword(result.data.newPassword);
  console.log("hashPass >>>", hashNewPass);

  const isSame = await comparePassword(
    result.data.currentPassword,
    user.password
  );

  if (!isSame) {
    return {
      errors: {
        currentPassword: ["password not same"],
      },
    };
  }

  // console.log("isSame >>>", isSame);
  if (isSame) {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashNewPass,
      },
    });
  }

  redirect("/");

  // return {
  //   errors: {},
  // };
}
