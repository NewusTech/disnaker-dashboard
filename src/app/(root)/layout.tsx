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
import LaporanIcon from "../../../public/assets/icons/LaporanIcon";
import DatauserIcon from "../../../public/assets/icons/DataUserIcon";
import PelayananIcon from "../../../public/assets/icons/PelayananIcon";
import MasterIcon from "../../../public/assets/icons/MasterIcon";
import IndeksIcon from "../../../public/assets/icons/IndeksIcon";
import EventIcon from "../../../public/assets/icons/EventIcon";
import LaporanDinasIcon from "../../../public/assets/icons/LaporanDinasIcon";
import InstansiIcon from "../../../public/assets/icons/InstansiIcon";
import InsDashboard from "../../../public/assets/icons/InsDashboard";
import KelolaIcon from "../../../public/assets/icons/KelolaIcon";
import InformasiIcon from "../../../public/assets/icons/InformasiIcon";
import BeritaIcon from "../../../public/assets/icons/BeritaIcon";
import InfoIcon from "../../../public/assets/icons/InfoIcon";
import ComponentWithAccess from "@/components/auth/componentWithAccess";
import { PERMISSIONS } from "@/utils/permissions";
import Swal from "sweetalert2";


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

    const handleLogout = () => {
        // Menghapus semua item di localStorage
        localStorage.clear();

        // Tampilkan pop-up sukses tanpa tombol OK, otomatis menghilang setelah 2 detik
        Swal.fire({
            title: 'Logout Berhasil',
            text: 'Anda akan diarahkan ke halaman login.',
            icon: 'success',
            timer: 2000,  // Pop-up akan otomatis tertutup setelah 2 detik
            timerProgressBar: true,  // Menampilkan progress bar waktu
            showConfirmButton: false,  // Tidak menampilkan tombol OK
        }).then(() => {
            // Arahkan ke halaman login setelah pop-up ditutup otomatis
            router.push('/login');
        });
    };

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
                            {/* accordion */}
                            <Accordion className="" type="single" collapsible>
                                {/* dashboard */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaDashboard,
                                        ...PERMISSIONS.company
                                    ]}
                                >
                                    <AccordionItem className="" value="item-1">
                                        <Link
                                            href="/dashboard"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/dashboard")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <DashboardIcon />
                                            </div>
                                            Dashboard
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* dashboard */}
                                {/* data-pengguna */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaDataPengguna
                                    ]}
                                >
                                    <AccordionItem className="" value="item-12">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/data-pengguna"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <DatauserIcon />
                                                </div>
                                                Data Pengguna
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/data-pengguna/akun-pengguna">
                                                <span className="text-[16px]">
                                                    Akun Pengguna
                                                </span>
                                            </Menu>
                                            <Menu link="/data-pengguna/akun-instansi">
                                                <span className="text-[16px]">
                                                    Akun Instansi
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* data-pengguna */}
                                {/* instansi-disnaker */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaInstansi,
                                        ...PERMISSIONS.company
                                    ]}
                                >
                                    <AccordionItem className="" value="item-8">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/instansi-disnaker"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <InstansiIcon />
                                                </div>
                                                Instansi
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/instansi-disnaker/lowongan-pekerjaan">
                                                <span className="text-[16px]">
                                                    Lowongan Pekerjaan
                                                </span>
                                            </Menu>
                                            <Menu link="/instansi-disnaker/lamaran-pekerjaan">
                                                <span className="text-[16px]">
                                                    Lamaran Pekerjaan
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* instansi-disnaker */}
                                {/* pelamar PERUSAHAAN*/}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.company
                                    ]}
                                >
                                    <AccordionItem className="" value="item-10">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/pelamar"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <PelamarIcon />
                                                </div>
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
                                </ComponentWithAccess>
                                {/* pelamar */}
                                {/* pelayanan PERUSAHAAN*/}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaPelayanan
                                    ]}
                                >
                                    <AccordionItem className="" value="item-7">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/pelayanan"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <PelayananIcon />
                                                </div>
                                                Pelayanan
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/pelayanan/kartu-kuning">
                                                <span className="text-[16px]">
                                                    Kartu Kuning
                                                </span>
                                            </Menu>
                                            <Menu link="/pelayanan/pengaduan">
                                                <span className="text-[16px]">
                                                    Pengaduan
                                                </span>
                                            </Menu>
                                            <Menu link="/pelayanan/transmigrasi">
                                                <span className="text-[16px]">
                                                    Transmigrasi
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* pelayanan */}
                                {/* layanan-ketenagakerjaan */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaKetenagakerjaan,
                                        ...PERMISSIONS.company
                                    ]}
                                >
                                    <AccordionItem className="" value="item-17">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/layanan-ketenagakerjaan"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <InformasiIcon />
                                                </div>
                                                Ketenagakerjaan
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/layanan-ketenagakerjaan/pelatihan">
                                                <span className="text-[16px]">
                                                    Pelatihan
                                                </span>
                                            </Menu>
                                            <Menu link="/layanan-ketenagakerjaan/sertifikasi">
                                                <span className="text-[16px]">
                                                    Sertifikasi
                                                </span>
                                            </Menu>
                                            <Menu link="/layanan-ketenagakerjaan/konsultasi">
                                                <span className="text-[16px]">
                                                    Konsultasi
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* layanan-ketenagakerjaan */}
                                {/* event */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaEvent
                                    ]}
                                >
                                    <AccordionItem className="" value="item-4">
                                        <Link
                                            href="/event"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/event")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <EventIcon />
                                            </div>
                                            Event
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* event */}
                                {/* indeks-kepuasan */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaSKM
                                    ]}
                                >
                                    <AccordionItem className="" value="item-5">
                                        <Link
                                            href="/indeks-kepuasan"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/indeks-kepuasan")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <IndeksIcon />
                                            </div>
                                            Indeks Kepuasan
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* indeks-kepuasan */}
                                {/* laporan */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaLaporan,
                                        ...PERMISSIONS.company
                                    ]}
                                >
                                    <AccordionItem className="" value="item-3">
                                        <Link
                                            href="/laporan-disnaker"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/laporan-disnaker")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <LaporanDinasIcon />
                                            </div>
                                            Laporan
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* laporan */}
                                {/* berita */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaBerita
                                    ]}
                                >
                                    <AccordionItem className="" value="item-3">
                                        <Link
                                            href="/berita"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/berita")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <BeritaIcon />
                                            </div>
                                            Berita
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* berita */}
                                {/* informasi */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaInformasi
                                    ]}
                                >
                                    <AccordionItem className="" value="item-22">
                                        <Link
                                            href="/informasi"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/informasi")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <InfoIcon />
                                            </div>
                                            Informasi
                                        </Link>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* berita */}
                                {/* master data */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaMasterData
                                    ]}
                                >
                                    <AccordionItem className="" value="item-6">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/master-data"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <MasterIcon />
                                                </div>
                                                Master Data
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/master-data/skill">
                                                <span className="text-[16px]">
                                                    Skill
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/kategori">
                                                <span className="text-[16px]">
                                                    Kategori Pekerjaan
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/provinsi">
                                                <span className="text-[16px]">
                                                    Provinsi
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/kabupaten">
                                                <span className="text-[16px]">
                                                    Kabupaten
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/kecamatan">
                                                <span className="text-[16px]">
                                                    Kecamatan
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/kelurahan">
                                                <span className="text-[16px]">
                                                    Kelurahan
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/fasilitas">
                                                <span className="text-[16px]">
                                                    Fasilitas
                                                </span>
                                            </Menu>
                                            <Menu link="/master-data/syarat-ketentuan">
                                                <span className="text-[16px]">
                                                    Syarat dan Ketentuan
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* master data */}
                                {/* kelola-akun */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.kelolaAkun
                                    ]}
                                >
                                    <AccordionItem className="" value="item-14">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/kelola-akun"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <KelolaIcon />
                                                </div>
                                                Kelola Akun
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/kelola-akun/admin">
                                                <span className="text-[16px]">
                                                    Admin
                                                </span>
                                            </Menu>
                                            <Menu link="/kelola-akun/role">
                                                <span className="text-[16px]">
                                                    Role
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* kelola-akun */}

                                {/* BATAS */}
                                {/* dashboard */}
                                {/* <AccordionItem className="" value="item-1">
                                        <Link
                                            href="/dashboard"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/dashboard")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <DashboardIcon />
                                            </div>
                                            Dashboard
                                        </Link>
                                    </AccordionItem> */}
                                {/* dashboard */}
                                {/* perusahaan */}
                                {/* <AccordionItem className="" value="item-9">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/perusahaan"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <PerusahaanIcon />
                                                </div>
                                                Instansi
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
                                    </AccordionItem> */}
                                {/* perusahaan */}
                                {/* pelamar */}
                                {/* <AccordionItem className="" value="item-10">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/pelamar"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <PelamarIcon />
                                                </div>
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
                                    </AccordionItem> */}
                                {/* pelamar */}
                                {/* layanan-ketenagakerjaan */}
                                {/* <AccordionItem className="" value="item-17">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/layanan-ketenagakerjaan"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center">
                                                <div className="w-[35px]">
                                                    <InformasiIcon />
                                                </div>
                                                Ketenagakerjaan
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/layanan-ketenagakerjaan/pelatihan">
                                                <span className="text-[16px]">
                                                    Pelatihan
                                                </span>
                                            </Menu>
                                            <Menu link="/layanan-ketenagakerjaan/sertifikasi">
                                                <span className="text-[16px]">
                                                    Sertifikasi
                                                </span>
                                            </Menu>
                                            <Menu link="/layanan-ketenagakerjaan/konsultasi">
                                                <span className="text-[16px]">
                                                    Konsultasi
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem> */}
                                {/* layanan-ketenagakerjaan */}
                                {/* laporan */}
                                {/* <AccordionItem className="" value="item-11">
                                        <Link
                                            href="/laporan-perusahaan"
                                            className={`nav hover:pl-10 duration-200 transition-all flex pr-4 text-[16px] items-center gap-[12px] mb-2 rounded-[8px] py-[10px] px-[24px] ${pathname.startsWith("/laporan-perusahaan")
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`} >
                                            <div className="w-[35px]">
                                                <LaporanIcon />
                                            </div>
                                            Laporan
                                        </Link>
                                    </AccordionItem> */}
                                {/* Laporan */}
                                {/* BATAS */}

                                {/* PROFIL */}
                                <ComponentWithAccess
                                    allowPermissions={[
                                        PERMISSIONS.semua,
                                        ...PERMISSIONS.company,
                                        ...PERMISSIONS.kelolaAkun,
                                        ...PERMISSIONS.kelolaBerita,
                                        ...PERMISSIONS.kelolaDashboard,
                                        ...PERMISSIONS.kelolaDataPengguna,
                                        ...PERMISSIONS.kelolaEvent,
                                        ...PERMISSIONS.kelolaInformasi,
                                        ...PERMISSIONS.kelolaInstansi,
                                        ...PERMISSIONS.kelolaKetenagakerjaan,
                                        ...PERMISSIONS.kelolaLaporan,
                                        ...PERMISSIONS.kelolaMasterData,
                                        ...PERMISSIONS.kelolaPelamar,
                                        ...PERMISSIONS.kelolaPelayanan,
                                        ...PERMISSIONS.kelolaSKM,
                                    ]}
                                >
                                    <div className="h-[1px] w-full bg-line-stroke my-3"></div>
                                    <AccordionItem className="" value="item-50">
                                        <AccordionTrigger
                                            className={`nav flex gap-2 mb-2 rounded-[8px] py-[10px] overflow-hidden px-[25px] font-normal ${pathname.startsWith(
                                                "/profile"
                                            )
                                                ? "bg-white text-primary"
                                                : "bg-transparent text-white"
                                                }`}>
                                            <div className="flex gap-3 items-center text-start">
                                                <div className="w-[45px] flex-shrink-0 bg-white rounded-full h-[45px] border-2 border-white overflow-hidden">
                                                    <Image
                                                        src="/assets/images/lambang.png"
                                                        alt="logo"
                                                        width={400}
                                                        height={400}
                                                        unoptimized
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                Disnaker Tanggamus
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-primary-600/25 mb-2 rounded-md">
                                            <Menu link="/profile">
                                                <span className="text-[16px]">
                                                    Profile
                                                </span>
                                            </Menu>
                                            <Menu link="/login">
                                                <span onClick={handleLogout} className="text-[16px]">
                                                    Logout
                                                </span>
                                            </Menu>
                                        </AccordionContent>
                                    </AccordionItem>
                                </ComponentWithAccess>
                                {/* PROFIL */}
                            </Accordion>
                            {/* accordion */}
                        </div>
                    </div>
                </div>
            </div>
            {/* KONTEN */}
            <div className="konten z-10 lg:px-0 px-[10px] lg:mr-[20px] lg:ml-[350px] md:pt-[15px] pt-[70px] h-full pb-5">
                <div className="konten overflow-auto h-[90%] p-3 lg:p-6 bg-white rounded-xl">
                    {/* konten */}
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default LayoutPerusahaan;
