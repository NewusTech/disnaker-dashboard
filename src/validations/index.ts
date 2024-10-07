"use client";

import { z } from "zod";

export const SignIn = z.object({
  username: z.string().min(2).max(50),
});

export const lowongan = z
  .object({
    posisi: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    kategori: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      })
      ,
    jenis_kelamin: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    maksimal_usia: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    tipe_pekerjaan: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    tipe_lokasi: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    skill: z
      .array(z.preprocess(val => Number(val), z.number()))
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    pengalaman: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    pendidikan: z
      .array(z.preprocess(val => Number(val), z.number()))
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    gaji: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    hari_kerja: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    jam_kerja: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    penutupan_lamaran: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    status: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    deskripsi: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tanggung_jawab: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    persyaratan: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type lowonganFormData = z.infer<typeof lowongan>;

