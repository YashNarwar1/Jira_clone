import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const SignUpSchema = z.object({
    fullName: z.string().trim().min(1, "Required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 characters long").max(256),
  });