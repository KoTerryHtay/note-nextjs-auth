"use client";

import { LoginUser } from "@/actions/user-login";
import ErrorFormMessage from "@/components/error-form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [state, action] = useFormState(LoginUser, {
    errors: {},
  });

  return (
    <div>
      <div className="p-3 text-center">Login Page</div>

      <form action={action} className="flex flex-col gap-3 px-10">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            required
            defaultValue={"user2@gmail.com"}
          />
          {state?.message?.email && (
            <ErrorFormMessage errorMessage={state.message.email} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <Input
            type="text"
            placeholder="Password"
            name="password"
            required
            defaultValue={123456}
          />
          {state?.message?.password && (
            <ErrorFormMessage errorMessage={state.message.password} />
          )}
        </div>
        <Button type="submit">Login</Button>
        <div>
          <div className="text-center">or</div>
        </div>
        <Link href={"/sign-up"}>
          <Button type="button" className="w-full">
            Create New Account
          </Button>
        </Link>
      </form>
    </div>
  );
}
