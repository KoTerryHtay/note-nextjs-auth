"use client";

import changePassword from "@/actions/change-password";
import ErrorFormMessage from "@/components/error-form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetUser from "@/hook/useGetUser";
import { useFormState } from "react-dom";

interface Params {
  params: {
    userId: string;
  };
}

export default function ChangePasswordPage({ params }: Params) {
  const user = useGetUser(+params.userId);

  const [state, action] = useFormState(
    changePassword.bind(null, +params.userId),
    {
      errors: {},
    }
  );

  return (
    <div>
      <div className="p-3">Change Password Page</div>
      <form action={action} className="flex flex-col gap-3 px-10">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="userName">User Name</label>
          <Input
            type="text"
            placeholder="User Name"
            name="userName"
            disabled
            defaultValue={user?.userName}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Current Password</label>
          <Input
            type="text"
            placeholder="Password"
            name="currentPassword"
            required
          />
          {state?.errors?.currentPassword && (
            <ErrorFormMessage errorMessage={state.errors.currentPassword} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">New Password</label>
          <Input
            type="text"
            placeholder="Password"
            name="newPassword"
            required
          />
          {state?.errors?.newPassword && (
            <ErrorFormMessage errorMessage={state.errors.newPassword} />
          )}
        </div>
        {state.message && <ErrorFormMessage errorMessage={state.message} />}
        <Button type="submit">Save Change</Button>
      </form>
    </div>
  );
}
