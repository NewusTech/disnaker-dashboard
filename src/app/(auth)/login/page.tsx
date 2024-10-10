"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {

  return (
    <div>
      <section className="">
        <div className="flex bg-primary md:bg-slate-50 h-screen">
          {/*  */}
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
          {/*  */}
          <div className="right mx-3 md:mx-0 w-full md:w-1/2 h-full bg-primary md:bg-slate-50 flex justify-center items-center">
            <div className="card w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6  sm:p-8">
                <div className="head my-3 mb-5 flex flex-col  gap-3">
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
                <form className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="login"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* <Link href="" className="text-sm font-medium text-primary hover:underline dark:text-teal-500">
                    Forgot password?
                  </Link> */}
                  </div>
                  <Button type="submit" className="text-white bg-primary py-2 px-4 rounded-lg w-full">
                    Masuk
                  </Button>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    Tidak punya akun?{' '}
                    <Link href="" className="font-medium text-primary hover:underline dark:text-teal-500">
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
