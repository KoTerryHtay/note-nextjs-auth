"use server";

import { db } from "@/db";
import { z } from "zod";
import { comparePassword } from ".";
import { signIn } from "@/auth";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: {
        email?: string;
        password?: string;
      };
    }
  | undefined;

export async function LoginUser(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const result = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // console.log("create new user >>>", result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (!user) {
    return {
      message: {
        email: "user not found",
      },
    };
  }

  const checkPassword = await comparePassword(
    result.data.password,
    user.password
  );

  if (!checkPassword) {
    return {
      message: {
        password: "password not correct",
      },
    };
  }

  // console.log("loginUser >>>", user);

  await signIn("credentials", {
    id: user.id,
    userName: user.userName,
    email: user.email,
    redirect: true,
    redirectTo: "/",
  });

  // return {
  //   errors: {},
  // };
}
