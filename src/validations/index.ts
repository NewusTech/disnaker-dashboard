"use client";

import { z } from "zod";

export const SignIn = z.object({
  username: z.string().min(2).max(50),
});

// Lowongan
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
    judul_pelatihan: z
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
    modul: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    no_wa: z
      .string()
      .min(1, { message: "Jawaban tidak boleh kosong!" }),
    level: z
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
export type pelatihanFormData = z.infer<typeof pelatihan>;

// Sertifikasi
export const sertifikasi = z
  .object({
    judul_sertifikasi: z
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
    level: z
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
export type sertifikasiFormData = z.infer<typeof sertifikasi>;

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

