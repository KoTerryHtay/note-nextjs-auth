"use server";

import { db } from "@/db";
import { z } from "zod";
import { hashPassword } from "@/actions";
import { revalidatePath } from "next/cache";
import { signIn } from "@/auth";

const SignUpFormSchema = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
});

export type SignUpFormState = {
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function createNewUser(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = SignUpFormSchema.safeParse({
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("create new user >>>", result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingAcc = !!(await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      email: true,
    },
  }));

  if (existingAcc) {
    return {
      message: "User already exist!",
    };
  }

  console.log("existingAcc >>>", existingAcc);

  const hashedPassword = await hashPassword(result.data.password);

  // console.log("newUser hashPassword >>>", hashedPassword);

  const newUser = await db.user.create({
    data: {
      userName: result.data?.userName,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      userName: true,
    },
  });

  console.log("newUser >>>", newUser);

  revalidatePath("/user");

  await signIn("credentials", {
    id: newUser.id,
    userName: newUser.userName,
    email: newUser.email,
    redirect: true,
    redirectTo: "/",
  });

  return {
    errors: {},
  };
}
