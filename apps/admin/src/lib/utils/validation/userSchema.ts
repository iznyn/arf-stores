import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "STAFF", "SUPER_ADMIN"]),
});

export const updateUserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "STAFF", "SUPER_ADMIN"]),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
});
