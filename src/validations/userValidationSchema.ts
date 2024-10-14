import { z } from "zod";

const commonUserValidation = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email(),
});

export const userValidationSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Password minimal 8 characters" }),
  })
  .merge(commonUserValidation)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
export const userUpdateValidationSchema = z
  .object({})
  .merge(commonUserValidation);
