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


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email wajib diisi" })
        .email({ message: "Alamat email tidak valid" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ForgotPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const [token, setAccessToken] = useLocalStorage("accessToken", "");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: FormSchemaType) => {
        setLoading(true);
        setLoginError(null); // Reset previous errors

        try {
            const response = await axiosInstance.post("/company/create", {
                email: data.email,
            });

            if (response.status === 200) {
                // alert
                Swal.fire({
                    icon: "success",
                    title: "Akun berhasil dibuat!",
                    text: "Silahkan login ✅",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showClass: {
                        popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                    },
                    customClass: {
                        title: "text-2xl font-semibold text-green-600",
                        icon: "text-green-500 animate-bounce",
                        timerProgressBar:
                            "bg-gradient-to-r from-indigo-400 to-blue-400", // Gradasi warna yang lembut
                    },
                    backdrop: `rgba(0, 0, 0, 0.4)`,
                });
                // alert
                // reset();
                router.push("/login");
            }
        } catch (error: any) {
            // alert
            // Extract error message from API response
            const errorMessage =
                error.response?.data?.data?.[0]?.message ||
                "Gagal mendaftar akun. Silakan coba lagi!";
            Swal.fire({
                icon: "error",
                title: "Terjadi kesalahan!",
                text: errorMessage,
                showConfirmButton: true,
                showClass: { popup: "animate__animated animate__fadeInDown" },
                hideClass: { popup: "animate__animated animate__fadeOutUp" },
                customClass: {
                    popup: "rounded-xl",
                    title: "text-2xl font-semibold text-red-600",
                    icon: "text-red-500 animate-bounce",
                    confirmButton: "bg-primary" // Warna biru untuk tombol konfirmasi
                },
                backdrop: "rgba(0, 0, 0, 0.4)",
            });
            console.error("Failed to create user:", error);
            // alert
            setLoginError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="">
                <div className="flex bg-primary md:bg-slate-50 h-screen">
                    <div className="left w-1/2 hidden h-full bg-[url('/assets/images/bg-login.png')] bg-center md:flex justify-center items-center">
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
                    <div className="right mx-3 md:mx-0 w-full md:w-1/2 h-full bg-primary md:bg-slate-50 flex flex-col justify-center items-center">
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
                                </div>
                                <h2 className="text-center font-medium text-xl md:text-2xl md:mb-10 md:mt-6 mb-5 mt-3">Lupa Password!</h2>
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                
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
                                 
                                    {loginError && (
                                        <div className="text-red-500 mt-2 text-center">{loginError}</div>
                                    )}
                                   
                                    <Button
                                        type="submit"
                                        className="text-white bg-primary py-3 px-4 rounded-full w-full mt-3 mb-3"
                                        disabled={loading}
                                    >
                                        {loading ? <Loading /> : "Kirim"}
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

export default ForgotPage;
