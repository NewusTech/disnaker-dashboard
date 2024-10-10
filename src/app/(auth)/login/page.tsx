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


const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" }),
  // .email({ message: "Alamat email tidak valid" }),
  password: z
    .string()
    .min(6, { message: "Password wajib diisi minimal harus 6 karakter" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const LoginPage = () => {
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
      const response = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        // alert
        Swal.fire({
          icon: "success",
          title: "Berhasil Login!",
          text: "Selamat Datang ✅",
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
        setAccessToken(response?.data?.data?.token);
        // reset();
        router.push("/dashboard");
      }
    } catch (error: any) {
      setAccessToken("");
      // alert
      // Extract error message from API response
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        "Login gagal. Silakan coba lagi!";
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
                  className="w-[100px] object-contain"
                />
              </div>
              <div className="teks">
                <div className="head font-bold text-xl md:text-3xl text-white">
                  DISNAKER TANGGAMUS
                </div>
                <div className="head text-sm md:text-base text-white">
                  Sistem Informasi Dinas Tenaga Kerja
                </div>
              </div>
            </div>
          </div>
          <div className="right mx-3 md:mx-0 w-full md:w-1/2 h-full bg-primary md:bg-slate-50 flex justify-center items-center">
            <div className="card w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 sm:p-8">
                <div className="head my-3 mb-5 flex flex-col gap-3">
                  <div className="log flex justify-center">
                    <Image
                      src="/assets/images/disnaker-logo.png"
                      alt="logo"
                      width={400}
                      height={400}
                      unoptimized
                      className="w-[300px] object-contain"
                    />
                  </div>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white text-center">
                    Masuk
                  </h1>
                </div>
                <h2 className="text-center">Masukkan data diri anda</h2>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <Input
                      type="text"
                      id="email"
                      {...register("email")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {errors.email && (
                      <HelperError>{errors.email.message}</HelperError>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.password && (
                        <HelperError>{errors.password.message}</HelperError>
                      )}
                    </div>
                  </div>
                  {loginError && (
                    <div className="text-red-500 mt-2">{loginError}</div>
                  )}
                  <Button
                    type="submit"
                    className="text-white bg-primary py-2 px-4 rounded-lg w-full"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Masuk"}
                  </Button>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Tidak punya akun?{" "}
                    <Link
                      href=""
                      className="font-medium text-primary hover:underline dark:text-teal-500"
                    >
                      Daftar
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
