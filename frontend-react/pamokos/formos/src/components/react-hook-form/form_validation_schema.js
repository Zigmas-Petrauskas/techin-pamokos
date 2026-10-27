import { z } from "zod";

export const schemaYoutube = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      // Ar nėra tarpų.
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain space",
        // Ar username nėra rezervuotas žodis.
      })
      .refine(
        (value) => !["admin", "root"].includes(value.toLowerCase()),
        "This username is reserved word",
      ),

    // El. pašto validacija.
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),

    // Kanalo pasirinkimo validacija.
    channel: z.string().min(1, "Please select a channel"),

    // Mėgstamos spalvos pasirinkimo validacija.
    favColor: z
      .string({
        error: "Please select your favorite color",
      })
      .min(1, "Please select your favorite color"),

    // Pomėgių pasirinkimo validacija.
    hobbies: z.array(z.string()).min(1, "Please select at least one hobby"),

    password: z
      .string()
      .min(6, "min 6 characters")
      .regex(/[A-Z]/, "password must be atleast 1 uppercase letter")
      .regex(/[0-9]/, "must contain minimum one number"),

    confirmPassword: z.string().min(1, "confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
