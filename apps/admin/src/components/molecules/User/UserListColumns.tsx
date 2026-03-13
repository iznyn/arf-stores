"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge, Button } from "@arfcodes/ui";
import { User } from "@/lib/types/actions/user.types";
import { Pencil } from "lucide-react";
import { DeleteUserDialog } from "@/components/organisms/User/DeleteUserDialog";
import Link from "next/link";

export const userListColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const roleColors: Record<string, string> = {
        SUPER_ADMIN: "destructive",
        ADMIN: "default",
        STAFF: "secondary",
      };
      return (
        <Badge variant={roleColors[role] as any || "secondary"}>
          {role.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "success" : "outline"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/users/${user.id}/edit`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <DeleteUserDialog userId={user.id} userName={user.name} />
        </div>
      );
    },
  },
];
