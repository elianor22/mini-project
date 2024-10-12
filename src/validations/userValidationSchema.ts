import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password minimal 8 characters" }),
});

export const userUpdateValidationSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email(),
});
