import { z } from "zod";

export const validateName = (name: string) => {
  const nameSchema = z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .refine((value) => isNaN(Number(value)), {
      message: "Name cannot be a number or numeric string",
    });

  const result = nameSchema.safeParse(name);

  return result;
};

export const validateEmail = (email: string) => {
  const emailSchema = z.string().email({ message: "Invalid email address" });

  const result = emailSchema.safeParse(email);

  return result;
};

export const validatePassword = (password: string) => {
  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    });

  const result = passwordSchema.safeParse(password);

  return result;
};
