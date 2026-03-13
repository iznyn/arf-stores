"use client";

import { Button, Card } from "@arfcodes/ui";
import Link from "next/link";
import { PageHeader } from "@/components/molecules/PageHeader/PageHeader";
import { UserFormFields } from "@/components/molecules/User/UserFormFields/UserFormFields";

interface UserFormProps {
  mode: "create" | "edit";
  defaultValues?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onSubmit: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  isLoading: boolean;
  error: string;
}

export function UserForm({ mode, defaultValues, onSubmit, isLoading, error }: UserFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={mode === "create" ? "Add New User" : "Edit User"}
        description={
          mode === "create"
            ? "Create a new user account with role and permissions"
            : "Update user account information and permissions"
        }
        backLink="/users"
        backLabel="Back to Users"
      />

      <Card className="shadow-sm border-border/60">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {mode === "create" ? "User Information" : "Edit User Information"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mode === "create" 
                  ? "Fill in the details below to create a new user account"
                  : "Update the user information below"
                }
              </p>
            </div>

            <UserFormFields
              mode={mode}
              defaultValues={defaultValues}
              isLoading={isLoading}
            />

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-border/60">
              <Link href="/users">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="px-6"
                >
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="px-6 min-w-[120px]"
              >
                {isLoading
                  ? mode === "create"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "create"
                  ? "Create User"
                  : "Update User"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
