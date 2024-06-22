"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { comparePassword } from ".";

const FormSchema = z.object({
  userName: z.string().min(3),
  password: z.string(),
});

type FormState = {
  errors?: {
    userName?: string[];
    password?: string[];
  };
  message?: string;
};

export default async function changeUserName(
  userId: string,
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const result = FormSchema.safeParse({
    userName: formData.get("userName"),
    password: formData.get("password"),
  });

  // console.log("change user name >>>", userId, result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const checkAcc = await db.user.findUnique({
    where: {
      id: +userId,
    },
    select: {
      id: true,
      userName: true,
      password: true,
    },
  });

  const checkPassword = await comparePassword(
    result.data.password,
    checkAcc!.password
  );

  if (checkAcc?.userName === result.data.userName) {
    return {
      errors: {
        userName: ["old user name"],
      },
    };
  }

  if (!checkPassword)
    return {
      errors: {
        password: ["password not same"],
      },
    };

  // console.log("checkPassword >>>", checkPassword);

  const changeUserName = await db.user.update({
    where: {
      id: checkAcc?.id,
    },
    data: {
      userName: result.data.userName,
    },
    select: {
      id: true,
      userName: true,
    },
  });

  // console.log("changeUserName >>>", changeUserName);

  revalidatePath("/user");

  redirect(`/user/${changeUserName.id}`);

  // return {
  //   errors: {},
  // };
}
