"use client";

import { z } from "zod";

export const SignIn = z.object({
  username: z.string().min(2).max(50),
});

// Lowongan
export const lowongan = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    category_id: z.preprocess(
        (val) => Number(val),
        z.number({
          required_error: "Jawaban tidak boleh kosong!"
        })),
    gender: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    maxAge: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    jobType: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    workLocation: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    skills: z
      .array(z.preprocess(val => Number(val), z.number()))
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    minExperience: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    educationLevels: z
      .array(z.preprocess(val => Number(val), z.number()))
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    salary: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    workingHour: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    workingDay: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    applicationDeadline: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    status: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    location: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    desc: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    responsibility: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    requirement: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type lowonganFormData = z.infer<typeof lowongan>;

// Event
export const event = z
  .object({
    nama_program: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    kategori: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    tanggal_mulai: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tanggal_selesai: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tempat: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    jam: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    link: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    deskripsi: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    banner: z.
      instanceof(File).refine(file => file.size > 0, { message: 'Gambar wajib diisi' }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type eventFormData = z.infer<typeof event>;

// Pelatihan
export const pelatihan = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    category_id: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    location: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    quota: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    startDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    endDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    time: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    linkModule: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    level: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    regisLink: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    desc: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    image: z.
      instanceof(File).refine(file => file.size > 0, { message: 'Gambar wajib diisi' }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type pelatihanFormData = z.infer<typeof pelatihan>;

// Pelatihan Edit
export const pelatihanEdit = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    category_id: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    location: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    quota: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    startDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    endDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    time: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    linkModule: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    level: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    regisLink: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    desc: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    image: z
      .instanceof(File).optional()
      .refine(file => !file || file.size > 0, { message: 'Gambar wajib diisi!' }),
  });
// Convert Zod schema to TypeScript type
export type pelatihanEditFormData = z.infer<typeof pelatihanEdit>;

// Sertifikasi
export const sertifikasi = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    category_id: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    location: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    quota: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })),
    startDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    endDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    time: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    level: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    regisLink: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    desc: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    image: z.
      instanceof(File).refine(file => file.size > 0, { message: 'Gambar wajib diisi' }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type sertifikasiFormData = z.infer<typeof sertifikasi>;

// Sertifikasi Edit
export const sertifikasiEdit = z
  .object({
    title: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    category_id: z
      .string({
        required_error: "Jawaban tidak boleh kosong!",
      }), // Wajib
    location: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    quota: z
      .preprocess((val) => Number(val), z.number()
      .min(1, { message: "Jawaban tidak boleh kosong!" })), // Wajib
    startDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    endDate: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    time: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    phoneNumber: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    level: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    regisLink: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    desc: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }), // Wajib
    image: z
    .instanceof(File).optional()
    .refine(file => !file || file.size > 0, { message: 'Gambar wajib diisi!' }),
  });

// Convert Zod schema to TypeScript type
export type sertifikasiEditFormData = z.infer<typeof sertifikasiEdit>;

// Konsultasi
export const konsultasi = z
  .object({
    judul_konsultasi: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    kategori: z
      .string({
        required_error: "Jawaban tidak boleh kosong!"
      }),
    tempat: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    kuota_peserta: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tanggal_mulai: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    tanggal_selesai: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    jam: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    no_wa: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    link: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    deskripsi: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    banner: z.
      instanceof(File).refine(file => file.size > 0, { message: 'Gambar wajib diisi' }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type konsultasiFormData = z.infer<typeof konsultasi>;

// Kelola Admin
export const kelolaAdmin = z
  .object({
    name: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
      email: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" })
      .email({ message: "Alamat email tidak valid" }),
    password: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    role: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type kelolaAdminFormData = z.infer<typeof kelolaAdmin>;

// Kelola Role
export const kelolaRole = z
  .object({
    name: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    permission: z
      .array(z.preprocess(val => Number(val), z.number()))
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
  })
  .required();
// Convert Zod schema to TypeScript type
export type kelolaRoleFormData = z.infer<typeof kelolaRole>;

