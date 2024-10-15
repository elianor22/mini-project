import { z } from "zod";

const UserSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password minimal 8 characters" }),
  confirmPassword: z
    .string()
    .trim()
    .min(8, { message: "Password minimal 8 characters" }),
});

type UserSchema = z.infer<typeof UserSchema>;

export const userValidationSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
  confirmPassword: true,
}).refine((val) => val.password === val.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
export const userUpdateValidationSchema = UserSchema.omit({
  password: true,
  confirmPassword: true,
});
