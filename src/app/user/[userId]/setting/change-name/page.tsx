"use client";

import changeUserName from "@/actions/change-user-name";
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

export default function ChangeNamePage({ params }: Params) {
  const user = useGetUser(+params.userId);

  const [state, action] = useFormState(
    changeUserName.bind(null, params.userId),
    {
      errors: {},
    }
  );

  if (!user && user !== null) return <div className="py-5 px-10">Loading</div>;

  if (user === null) return <div className="py-5 px-10">User Not Found</div>;

  return (
    <div>
      <div className="p-3">Change User Name Page</div>
      <form action={action} className="flex flex-col gap-3 px-10">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="userName">User Name</label>
          <Input
            defaultValue={user.userName}
            type="text"
            placeholder="User Name"
            name="userName"
            id="userName"
            required
          />
          {state?.errors?.userName && (
            <ErrorFormMessage errorMessage={state.errors.userName} />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password">Current Password</label>
          <Input
            type="text"
            placeholder="Password"
            name="password"
            id="password"
            required
          />
          {state?.errors?.password && (
            <ErrorFormMessage errorMessage={state.errors.password} />
          )}
        </div>
        {state.message && <ErrorFormMessage errorMessage={state.message} />}
        <Button type="submit">Save Change</Button>
      </form>
    </div>
  );
}
