"use client"

import Garis from "@/components/ui/garis";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define the structure of the data props
interface Company {
    id: number;
    name: string;
}

interface VacancyCategory {
    id: number;
    name: string;
}

interface Certification {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: Company;
    VacancyCategory: VacancyCategory;
}

interface CertificationResponse {
    data: Certification;
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

const Sertifikasi: React.FC<CertificationResponse> = ({ data }) => {
    const [isModalOpenSertifikasi, setIsModalOpenSertifikasi] = useState(false);
    const openModalSertifikasi = () => setIsModalOpenSertifikasi(true);
    const closeModalSertifikasi = () => setIsModalOpenSertifikasi(false);

    return (
        <div>
            {/* Detail */}
            <div className="head flex flex-col gap-3">
                <div className="title text-xl font-semibold">{data?.title ?? "-"}</div>
                <div className="date text-[#3D3D3DB2]/70">
                    {data?.createdAt ? new Date(data?.createdAt).toISOString().split('T')[0] : '-'}
                </div>
                <div className="foto ">
                    <div className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalSertifikasi}>
                        <Image
                            src={data?.image}
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
                            <ProfileDetail label="Kuota Peserta" value={data?.quota?.toString() ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Mulai" value={data?.startDate ?? "-"} />
                            <ProfileDetail label="Tanggal Selesai" value={data?.endDate ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jam Mulai" value={data?.time ?? "-"} />
                            <ProfileDetail label="Level" value={data?.level ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tempat" value={data?.location ?? "-"} />
                            <ProfileDetail label="Nomor Whatsapp" value={data?.phoneNumber ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
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

            {/* Sertifikasi Modal */}
            {isModalOpenSertifikasi && (
                <div onClick={closeModalSertifikasi} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalSertifikasi}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data?.image ?? "-"}
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
            {/* Sertifikasi Modal */}
        </div>
    );
};

export default Sertifikasi;
