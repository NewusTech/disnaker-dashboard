"use client"

import Garis from "@/components/ui/garis";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define the structure of the data props
interface PelatihanProps {
    data: {
        judul: string;
        namaInstansi: string;
        kuotaPeserta: string;
        level: string;
        noWA: string;
        modul: string;
        tanggalBuat: string;
        banner: string;
        deskripsi: string;
        tempat: string;
        jam: string;
        tanggalMulai: string;
        tanggalSelesai: string;
        kategori: string;
        link: string;
    };
}

interface ProfileInfo {
    label: string;
    value: string;
}

const ProfileDetail: React.FC<ProfileInfo> = ({ label, value }) => (
    <div className="left w-1/2">
        <div className="label text-sm text-[#3D3D3D]/70">{label}</div>
        <div className="teks text-[#3D3D3D]">{value}</div>
    </div>
);

const Pelatihan: React.FC<PelatihanProps> = ({ data }) => {
    const [isModalOpenPelatihan, setIsModalOpenPelatihan] = useState(false);
    const openModalPelatihan = () => setIsModalOpenPelatihan(true);
    const closeModalPelatihan = () => setIsModalOpenPelatihan(false);

    return (
        <div>
            {/* Detail */}
            <div className="head flex flex-col gap-3">
                <div className="title text-xl font-semibold">{data.judul}</div>
                <div className="date text-[#3D3D3DB2]/70">{data.tanggalBuat}</div>
                <div className="foto ">
                    <div className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalPelatihan}>
                        <Image
                            src={data.banner}
                            alt="Foto User"
                            className="object-cover w-full h-full"
                            width={800}
                            height={800}
                            unoptimized
                        />
                    </div>
                </div>
                <div className="Deksripsi mt-4">
                    {data.deskripsi}
                </div>
            </div>
            <Garis />
            <div className="wrap-all flex flex-col gap-6 mt-6">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Judul Pelatihan" value={data.judul} />
                            <ProfileDetail label="Kategori" value={data.kategori} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama Instansi" value={data.namaInstansi} />
                            <ProfileDetail label="Kuota Peserta" value={data.kuotaPeserta} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Mulai" value={data.tanggalMulai} />
                            <ProfileDetail label="Tanggal Selesai" value={data.tanggalSelesai} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tempat" value={data.tempat} />
                            <ProfileDetail label="Level" value={data.level} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jam Mulai" value={data.jam} />
                            <div className="left w-1/2">
                                <div className="label text-sm text-[#3D3D3D]/70">Link Pendaftaran :</div>
                                <Link target="blank" href={data.link} className="teks text-[#3D3D3D] hover:text-primary underline">Klik Disini!!</Link>
                            </div>
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nomor Whatsapp" value={data.noWA} />
                            <div className="left w-1/2">
                                <div className="label text-sm text-[#3D3D3D]/70">Link Pendaftaran :</div>
                                <Link target="blank" href={data.link} className="teks text-[#3D3D3D] hover:text-primary underline">Klik Disini!!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}

            {/* Pelatihan Modal */}
            {isModalOpenPelatihan && (
                <div onClick={closeModalPelatihan} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalPelatihan}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data.banner}
                                alt={`Full-size photo of user`}
                                className="object-cover"
                                width={800}
                                height={800}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Pelatihan Modal */}
        </div>
    );
};

export default Pelatihan;
