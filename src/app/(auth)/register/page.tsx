"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/utils/axios";
import useLocalStorage from "@/hooks/useLocalStorage";
import HelperError from "@/components/ui/HelperError";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "@/components/ui/Loading";
import { showAlert } from "@/lib/swalAlert";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";


const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Nama perusahaan wajib diisi" }),
    email: z
        .string()
        .min(1, { message: "Email wajib diisi" })
        .email({ message: "Alamat email tidak valid" }),
    password: z
        .string()
        .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const [loginError, setLoginError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const router = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            await axiosPrivate.post("/company/create", data);
            console.log(data)
            showAlert('success', 'Berhasil mendaftar akun!');
            // Success alert

            navigate.push("/login");
        } catch (error: any) {
            // Extract error message from API response
            console.log(data)
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal mendaftar akun!';
            showAlert('error', errorMessage);
            //   alert

            console.error("Failed to create user:", error);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
    };

    return (
        <div>
            <section className="flex flex-col h-screen">
                <div className="bg-primary md:bg-slate-50 grid flex-1 grid-cols-1 lg:grid-cols-[50%_minmax(50%,_1fr)]">
                    <div className="left  hidden h-full bg-[url('/assets/images/bg-login.png')] bg-center md:flex justify-center items-center">
                        <div className="logo flex items-center gap-4">
                            <div className="im">
                                <Image
                                    src="/assets/images/lambang.png"
                                    alt="logo"
                                    width={400}
                                    height={400}
                                    unoptimized
                                    className="w-[150px] object-contain"
                                />
                            </div>
                            <div className="teks">
                                <div className="head font-bold text-xl md:text-4xl text-white">
                                    DISNAKER TANGGAMUS
                                </div>
                                <div className="head text-sm md:text-xl text-white">
                                    Sistem Informasi Dinas Tenaga Kerja
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="right mx-3 md:mx-0 w-full md: h-full bg-primary md:bg-slate-50 flex flex-col justify-center items-center">
                        <div className="mb-5 md:hidden">
                            <div className="logo flex items-center gap-2">
                                <div className="im">
                                    <Image
                                        src="/assets/images/lambang.png"
                                        alt="logo"
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className="w-[50px] object-contain"
                                    />
                                </div>
                                <div className="teks">
                                    <div className="head font-bold text-xl text-white">
                                        DISNAKER TANGGAMUS
                                    </div>
                                    <div className="head text-xs text-white">
                                        Sistem Informasi Dinas Tenaga Kerja
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl mx-3 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 sm:p-8">
                                <div className="head my-3 mb-5 flex flex-col gap-3">
                                    <div className="log flex justify-center md:mb-7">
                                        <Image
                                            src="/assets/images/disnaker-logo.png"
                                            alt="logo"
                                            width={400}
                                            height={400}
                                            unoptimized
                                            className="w-[300px] object-contain"
                                        />
                                    </div>
                                    <h1 className="text-base leading-tight tracking-tight md:text-2xl  text-center">
                                        Selamat Datang Di Dashboard Disnaker
                                    </h1>
                                    <div className="text-center md:text-base text-sm hidden md:block">
                                        Dashboard Disnaker Tanggamus adalah platform layanan ketenagakerjaan terpadu untuk kartu kuning, lowongan kerja, pelatihan, sertifikasi, dan pengaduan online, mempermudah akses bagi masyarakat.
                                    </div>
                                </div>
                                <h2 className="text-center font-medium text-xl md:text-2xl md:mb-10 md:mt-6 mb-5 mt-3">Daftar Akun!</h2>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div>
                                        <label
                                            htmlFor="nama"
                                            className="block mb-2 text-sm md:text-base font-medium text-gray-900 "
                                        >
                                            Nama Perusahaan
                                        </label>
                                        <Input
                                            type="text"
                                            id="nama"
                                            {...register("name")}
                                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full p-3"
                                            placeholder="Nama Perusahaan"
                                        />
                                        {errors.name && (
                                            <HelperError>{errors.name.message}</HelperError>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm md:text-base font-medium text-gray-900 "
                                        >
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            id="email"
                                            {...register("email")}
                                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full p-3"
                                            placeholder="name@email.com"
                                        />
                                        {errors.email && (
                                            <HelperError>{errors.email.message}</HelperError>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm md:text-base font-medium text-gray-900 "
                                        >
                                            Kata Sandi
                                        </label>
                                        <div className="relative">
                                            <Input
                                                type="password"
                                                id="password"
                                                {...register("password")}
                                                placeholder="••••••••"
                                                className="border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:primary focus:border-primary block w-full p-3"
                                            />
                                            {errors.password && (
                                                <HelperError>{errors.password.message}</HelperError>
                                            )}
                                        </div>
                                    </div>
                                    {loginError && (
                                        <div className="text-red-500 mt-2 text-center">{loginError}</div>
                                    )}
                                   
                                    <Button
                                        type="submit"
                                        className="text-white bg-primary py-3 px-4 rounded-full w-full mt-3 mb-3"
                                        disabled={loading}
                                    >
                                        {loading ? <Loading /> : "Daftar"}
                                    </Button>
                                </form>
                                <div className="mt-4 md:text-base text-sm text-center">
                                    Dengan mendaftar, Kamu telah menyetujui <span className="text-primary hover:underline font-medium">Syarat & Ketentuan</span> kami dan Kamu telah membaca <span className="text-primary hover:underline font-medium">Kebijakan Privasi</span> kami.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;
