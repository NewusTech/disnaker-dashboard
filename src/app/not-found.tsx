import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function notFound() {
  return (
    <section className="container min-h-screen flex flex-col py-[5rem] justify-center items-center">

      <div className="im">
        <Image
          src="/assets/images/disnaker-logo.png"
          alt="logo"
          width={1000}
          height={1000}
          unoptimized
          className="w-[400px] object-contain"
        />
      </div>
      <div className="im">
        <Image
          src="/assets/illustrations/not-found.gif"
          alt="logo"
          width={1000}
          height={1000}
          unoptimized
          className="w-[800px] object-contain"
        />
      </div>
      {/* <h1 className="font-bold text-4xl text-center text-primary-main">404</h1> */}
      <h2 className="text-center text-xl mb-2">
        Opps... Sepertinya halaman yang anda cari tidak ditemukan
      </h2>
      <Link href="/" className=" text-center mt-4 mb-[5rem] rounded-full py-2 bg-primary text-white px-10 transition ease-in-out delay-150 hover:-translate-y-1">
        Kembali Kehalaman Utama
      </Link>
    </section>
  );
}
