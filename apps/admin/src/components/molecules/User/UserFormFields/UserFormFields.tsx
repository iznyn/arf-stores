"use client";

import { useState } from "react";
import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@arfcodes/ui";

interface UserFormFieldsProps {
  mode: "create" | "edit";
  defaultValues?: {
    name?: string;
    email?: string;
    role?: string;
  };
  isLoading: boolean;
}

export function UserFormFields({ mode, defaultValues, isLoading }: UserFormFieldsProps) {
  const [selectedRole, setSelectedRole] = useState(defaultValues?.role || "");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={defaultValues?.name}
            placeholder="Enter full name"
            required
            disabled={isLoading}
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={defaultValues?.email}
            placeholder="user@example.com"
            required
            disabled={isLoading}
            className="h-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-foreground">
            Password {mode === "create" && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={mode === "create" ? "Enter password" : "Leave blank to keep current"}
            required={mode === "create"}
            disabled={isLoading}
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            {mode === "create" ? "Password must be at least 8 characters long" : "Leave blank to keep current password"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm font-medium text-foreground">
            Role <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedRole}
            onValueChange={(value) => {
              setSelectedRole(value);
            }}
            disabled={isLoading}
            required
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STAFF">Staff</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            </SelectContent>
          </Select>
          <input 
            type="hidden" 
            name="role" 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
