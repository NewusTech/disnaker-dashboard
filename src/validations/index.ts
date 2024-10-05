"use client";

import { z } from "zod";

export const SignIn = z.object({
  username: z.string().min(2).max(50),
});

export const lowongan = z
  .object({
    tahun: z
      .string({ message: "Pertanyaan tidak boleh kosong!" })
      .min(1, { message: "Pertanyaan tidak boleh kosong!" }),
      nama_poktan: z
      .string({ message: "Jawaban tidak boleh kosong!" })
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type lowonganFormData = z.infer<typeof lowongan>;

