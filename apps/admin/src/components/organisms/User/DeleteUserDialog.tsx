"use client";

import { useState } from "react";
import { Button, Dialog } from "@arfcodes/ui";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/lib/actions/users/deleteUser";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
}

export function DeleteUserDialog({ userId, userName }: DeleteUserDialogProps) {
  const router = useRouter();
  const { userId: currentUserId } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Prevent users from deleting themselves
  const isCurrentUser = userId === currentUserId;

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    const result = await deleteUser(userId);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setOpen(false);
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className={`h-8 w-8 p-0 ${
          isCurrentUser 
            ? "text-muted-foreground/50 cursor-not-allowed" 
            : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
        }`}
        disabled={isCurrentUser}
        title={isCurrentUser ? "You cannot delete your own account" : "Delete user"}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Delete User</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Are you sure you want to delete this user?
              </p>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">
                <strong>Warning:</strong> This action cannot be undone. User{" "}
                <strong>{userName}</strong> will be permanently deleted.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? "Deleting..." : "Delete User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
