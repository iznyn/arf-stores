"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserForm } from "./UserForm";
import { updateUser } from "@/lib/actions/users/updateUser";

interface UserEditFormProps {
  userId: string;
  defaultValues: {
    name: string;
    email: string;
    role: string;
  };
}

export function UserEditForm({ userId, defaultValues }: UserEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsLoading(true);

    formData.append("id", userId);
    
    const result = await updateUser(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return result;
    } else {
      router.push("/users");
      router.refresh();
      return result;
    }
  };

  return (
    <UserForm
      mode="edit"
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
