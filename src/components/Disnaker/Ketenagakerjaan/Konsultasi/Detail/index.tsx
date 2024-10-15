"use client"

import Garis from "@/components/ui/garis";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define the structure of the data props
interface ApiResponse {
    data: Consultation;
}

interface Company {
    id: number;
    name: string;
}

interface VacancyCategory {
    id: number;
    name: string;
}

interface Consultation {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string; // Can also be typed as `string` or `null` if necessary
    location: string;
    quota: number;
    startDate: string; // You might want to use Date type here after parsing
    endDate: string;   // You might want to use Date type here after parsing
    time: string;
    phoneNumber: string;
    regisLink: string;
    image: string;
    createdAt: string; // Consider using Date type here after parsing
    updatedAt: string; // Consider using Date type here after parsing
    Company: Company;
    VacancyCategory: VacancyCategory;
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

const Konsultasi: React.FC<ApiResponse> = ({ data }) => {
    const [isModalOpenKonsultasi, setIsModalOpenKonsultasi] = useState(false);
    const openModalKonsultasi = () => setIsModalOpenKonsultasi(true);
    const closeModalKonsultasi = () => setIsModalOpenKonsultasi(false);

    return (
        <div>
            {/* Detail */}
            <div className="head flex flex-col gap-3">
                <div className="title text-xl font-semibold">{data?.title ?? "-"}</div>
                <div className="date text-[#3D3D3DB2]/70">
                    {data?.createdAt ? new Date(data?.createdAt).toISOString().split('T')[0] : '-'}
                </div>
                <div className="foto ">
                    <div className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalKonsultasi}>
                        <Image
                            src={data?.image ?? "-"}
                            alt="Foto User"
                            className="object-cover w-full h-full"
                            width={800}
                            height={800}
                            unoptimized
                        />
                    </div>
                </div>
                <div className="Deksripsi mt-4">
                    <div
                        className="prose max-w-none text-justify"
                        dangerouslySetInnerHTML={{ __html: data?.desc || "Tidak Ada Deskripsi" }}
                    />
                </div>
            </div>
            <Garis />
            <div className="wrap-all flex flex-col gap-6 mt-6">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Judul Pelatihan" value={data?.title ?? "-"} />
                            <ProfileDetail label="Kategori" value={data?.VacancyCategory?.name ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama Instansi" value={data?.Company?.name ?? "-"} />
                            <ProfileDetail label="Kuota Peserta" value={data?.quota.toString() ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Mulai" value={data?.startDate ?? "-"} />
                            <ProfileDetail label="Tanggal Selesai" value={data?.endDate ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jam Mulai" value={data?.time ?? "-"} />
                            <ProfileDetail label="Tempat" value={data?.location ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nomor Whatsapp" value={data?.phoneNumber ?? "-"} />
                            <div className="left w-1/2">
                                <div className="label text-sm text-[#3D3D3D]/70">Link Pendaftaran</div>
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${data?.regisLink?.startsWith('http://') || data?.regisLink?.startsWith('https://')
                                        ? data?.regisLink
                                        : `https://${data?.regisLink}`
                                        }`}
                                    className="teks text-[#3D3D3D] hover:text-primary underline"
                                >
                                    Klik Disini!!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}

            {/* Konsultasi Modal */}
            {isModalOpenKonsultasi && (
                <div onClick={closeModalKonsultasi} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalKonsultasi}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data?.image}
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
            {/* Konsultasi Modal */}
        </div>
    );
};

export default Konsultasi;
