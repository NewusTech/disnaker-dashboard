"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Define the structure of the data props

interface UserEventResponse {
    data: UserEvent;
}

interface UserEvent {
    id: number;
    title: string;
    slug: string;
    desc: string;
    category_id: number;
    image: string;
    startDate: string; // You can use Date after parsing
    endDate: string; // You can use Date after parsing
    regisLink: string;
    phoneNumber: string;
    time: string;
    location: string;
    createdAt: string; // You can use Date after parsing
    updatedAt: string; // You can use Date after parsing
    VacancyCategory: VacancyCategory;
}

interface VacancyCategory {
    id: number;
    name: string;
}

interface ProfileInfo {
    label: string;
    value: string;
}

const ProfileDetail: React.FC<ProfileInfo> = ({ label, value }) => (
    <div className="left w-1/2">
        <div className="label text-[#3572EF]">{label}</div>
        <div className="teks text-sm">{value}</div>
    </div>
);

const Event: React.FC<UserEventResponse> = ({ data }) => {
    const [isModalOpenEvent, setIsModalOpenEvent] = useState(false);
    const openModalEvent = () => setIsModalOpenEvent(true);
    const closeModalEvent = () => setIsModalOpenEvent(false);

    return (
        <div>
            {/* Detail */}
            <div className="head flex flex-col gap-3">
                <div className="title text-xl font-semibold">{data?.title ?? "-"}</div>
                <div className="date text-[#3D3D3DB2]/70">
                    {data?.createdAt ? new Date(data?.createdAt).toISOString().split('T')[0] : '-'}
                </div>
                <div className="foto ">
                    <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalEvent}>
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
                <div className="Deksripsi">
                    <div
                        className="prose max-w-none text-justify"
                        dangerouslySetInnerHTML={{ __html: data?.desc || "Tidak Ada Deskripsi" }}
                    />
                </div>
            </div>
            <div className="wrap-all flex flex-col gap-6 mt-4">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tempat" value={data?.location ?? "-"} />
                            <ProfileDetail label="Jam" value={data?.time ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Mulai" value={data?.startDate ?? "-"} />
                            <ProfileDetail label="Tanggal Selesai" value={data?.endDate ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Kategori" value={data?.VacancyCategory.name ?? "-"} />
                            <div className="left w-1/2">
                                <div className="label text-[#3572EF]">Link Pendaftaran :</div>
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

            {/* Event Modal */}
            {isModalOpenEvent && (
                <div onClick={closeModalEvent} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalEvent}
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
            {/* Event Modal */}
        </div>
    );
};

export default Event;
