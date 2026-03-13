"use client";

import { useState } from "react";
import { createUser } from "@/lib/actions/users/createUser";
import { useRouter } from "next/navigation";
import { UserForm } from "@/components/organisms/User/UserForm";

export default function NewUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsLoading(true);

    const result = await createUser(formData);

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
      mode="create"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
