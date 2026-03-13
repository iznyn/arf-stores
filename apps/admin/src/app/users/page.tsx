import { DataTable, Button } from "@arfcodes/ui";
import { userListColumns } from '@/components/molecules/User/UserListColumns';
import { getUsers } from "@/lib/actions/users/getUsers";
import { User } from "@/lib/types/actions/user.types";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Users</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <Link href="/users/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </Link>
      </div>

      <DataTable columns={userListColumns} data={users} />
    </div>
  );
}
