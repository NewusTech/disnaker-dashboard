"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import DashboardIcon from "../../../public/assets/icons/DashboardIcon";
import MasyarakatIcon from "../../../public/assets/icons/MasyarakatIcon";
import LowonganIcon from "../../../public/assets/icons/LowonganIcon";
import PerusahaanIcon from "../../../public/assets/icons/PerusahaanIcon";
import PelamarIcon from "../../../public/assets/icons/PelamarIcon";


interface LayoutPerusahaanProps {
    children: React.ReactNode;
    title?: string;
}

interface MenuProps {
    icons?: React.ReactNode;
    children: React.ReactNode;
    title?: string;
    link: string;
}

const Menu = (props: MenuProps) => {
    const pathname = usePathname();
    return (
        <Link
            href={props.link}
            className={`nav hover:pl-[15px] transition-all duration-150 flex items-center gap-4 text-left rounded-[8px] py-[13px]  px-[10px] ${pathname.startsWith(props.link) ? "text-white" : "text-white"}`} >
            <div className="icon">{props.icons}</div>
            <div className={`nama flex gap-2 items-center ${pathname.startsWith(props.link)
                ? "text-white pl-4"
                : "text-white"
                }`}>
                {pathname.startsWith(props.link) && (
                    <div className="circle h-[8px] w-[8px] rounded-full bg-white"></div>
                )}
                {props.children}
            </div>
        </Link>
    );
};

interface LayProps {
    link?: string;
}

const LayoutPerusahaan = (props: LayoutPerusahaanProps) => {
    const router = useRouter();

    const [navbar, setNavbar] = useState(false);

    const pathname = usePathname();
    const isProdukActive =
        pathname.startsWith("/admin/cms/kategori") ||
        pathname.startsWith("/admin/cms/unit");
    const [produk, setProduk] = useState(isProdukActive);

    const handleProduk = () => {
        setProduk(!produk);
    };

    const handleNavbar = () => {
        setNavbar(!navbar);
    };
    const handleDropdownOpen = (route: string) => {
        setIsDropdownOpen(isDropdownOpen === route ? null : route);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
    return (
        <div className="wrap w-full min-h-screen bg-[#F6F6F6] relative">
            {/* navbar */}
            <div className="navatas lg:px-0 top-0 w-full md:w-full right-0 fixed md:bg-transparent bg-[#F6F6F6] py-4 pr-5 pl-5 md:-z-30 z-10">
                <div className="wra white -z-10 md:ml-[290px] bg-transparent m-auto justify-between lg:justify-end md:py-[23px] flex items-center gap-4 text-left">
                    <div className="teks flex-shrink-0 text-primary animate-pulse transition-all">
                        <div className="head font-bold text-lg text-primary">
                            SINAKER
                        </div>
                        <div className="head text-sm">Super Admin</div>
                    </div>
                    <div
                        onClick={handleNavbar}
                        className="icon  flex cursor-pointer lg:hidden bg-primary rounded p-2 w-[40px] justify-center items-center px-2 text-white "
                    >
                        {navbar ? "x" : "="}
                    </div>
                </div>
            </div>
            {/* sidebar */}
            <div className={`sidebar bg-primary overflow-auto z-50 pt-[10px] lg:pt-0 lg:z-20 lg:block h-screen fixed top-0 ${navbar ? "left-[0%]" : "left-[-100%]"
                } box-border lg:w-[330px] lg:shadow-none shadow-lg w-[75%] px-[20px] bg-whie transition-all duration-300 lg:left-0 `}>
                <div className="LOGO absolute top-0 bg-white h-[100px] flex w-full left-0 gap-2 items-center ">
                    <div className="logo flex justify-center w-full px-6">
                        <Image
                            src="/assets/images/disnaker-logo.png"
                            alt="logo"
                            width={400}
                            height={400}
                            unoptimized
                            className="w-[300px]"
                        />
                    </div>
                </div>
                {/* menu */}
                <div className="wrap-nav mt-[130px] flex bg-red flex-col gap-2 mb-10">
                    <div className="wrap flex flex-col gap-1 ">
                        <div className="h-[73%] overflow-auto">
                            {/* dashboard */}
                            <Link
                                href="/dashboard-perusahaan"
                                className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-4 mb-2 rounded-[8px] py-[10px] px-[25px] ${pathname.startsWith("/dashboard")
                                    ? "bg-white text-primary"
                                    : "bg-transparent text-white"
                                    }`} >
                                <DashboardIcon />
                                Dashboard
                            </Link>
                            {/* dashboard */}
                            {/* perusahaan */}
                            <Accordion className="" type="single" collapsible>
                                {/* perusahaan */}
                                <AccordionItem className="" value="item-2">
                                    <AccordionTrigger
                                        className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[30px] font-normal ${pathname.startsWith(
                                            "/perusahaan"
                                        )
                                            ? "bg-white text-primary"
                                            : "bg-transparent text-white"
                                            }`}>
                                        <div className="flex gap-3 items-center">
                                            <PerusahaanIcon />
                                            Perusahaan
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                        <Menu link="/perusahaan/lowongan-pekerjaan">
                                            <span className="text-[16px]">
                                                Lowongan Pekerjaan
                                            </span>
                                        </Menu>
                                        <Menu link="/perusahaan/lamaran-pekerjaan">
                                            <span className="text-[16px]">
                                                Lamaran Pekerjaan
                                            </span>
                                        </Menu>
                                    </AccordionContent>
                                </AccordionItem>
                                {/* Lowongan */}
                            </Accordion>
                            {/* perusahaan */}
                            {/* pelamar */}
                            <Accordion className="" type="single" collapsible>
                                {/* pelamar */}
                                <AccordionItem className="" value="item-2">
                                    <AccordionTrigger
                                        className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[30px] font-normal ${pathname.startsWith(
                                            "/pelamar"
                                        )
                                            ? "bg-white text-primary"
                                            : "bg-transparent text-white"
                                            }`}>
                                        <div className="flex gap-3 items-center">
                                            <PelamarIcon />
                                            Pelamar
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                        <Menu link="/pelamar/undang-pelamar">
                                            <span className="text-[16px]">
                                                Undang Pelamar
                                            </span>
                                        </Menu>
                                        <Menu link="/pelamar/pelamar-diundang">
                                            <span className="text-[16px]">
                                                Pelamar Diundang
                                            </span>
                                        </Menu>
                                    </AccordionContent>
                                </AccordionItem>
                                {/* Lowongan */}
                            </Accordion>
                            {/* lowongan */}
                        </div>
                    </div>
                </div>
            </div>
            {/* KONTEN */}
            <div className="konten z-10 lg:px-0 px-[10px] lg:mr-[20px] lg:ml-[350px] md:pt-[15px] pt-[70px] h-full">
                <div className="konten overflow-auto h-[90%] p-3 lg:p-6 bg-white rounded-xl">
                    {/* konten */}
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default LayoutPerusahaan;
