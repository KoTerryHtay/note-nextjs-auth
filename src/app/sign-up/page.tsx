"use client";

import { createNewUser } from "@/actions/create-new-user";
import ErrorFormMessage from "@/components/error-form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

export default function SignUpPage() {
  const [state, action] = useFormState(createNewUser, {
    errors: {},
  });

  return (
    <div>
      <div className="p-3">AdminPage</div>
      <form action={action} className="flex flex-col gap-3 px-10">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="userName">User Name</label>
          <Input type="text" placeholder="User Name" name="userName" required />
          {state?.errors?.userName && (
            <ErrorFormMessage errorMessage={state.errors.userName} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="text" placeholder="Email" name="email" required />
          {state?.errors?.email && (
            <ErrorFormMessage errorMessage={state.errors.email} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Password</label>
          <Input type="text" placeholder="Password" name="password" required />
          {state?.errors?.password && (
            <ErrorFormMessage errorMessage={state.errors.password} />
          )}
        </div>
        {state.message && <ErrorFormMessage errorMessage={state.message} />}
        <Button type="submit">Create New User</Button>
      </form>
    </div>
  );
}
