"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Define the structure of the data props
// Define the TransmigrationMember interface
interface TransmigrationMember {
    id: number;
    transmigration_id: number;
    nik: string;
    name: string;
    gender: string;
    familyStatus: string;
    createdAt: string;
    updatedAt: string;
}

// Define the UserProfile interface
interface UserProfile {
    id: number;
    user_id: number;
    name: string;
    nik: string;
    birthDate: string;
    slug: string;
    department: string;
    gender: string;
    address: string;
    phoneNumber: string;
    about: string;
    cv: string;
    portfolio: string;
    birthPlace: string;
    religion: string;
    location: string;
    profession: string;
    image: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    kk: string;
    ktp: string;
    employmentStatus: string;
    maritalStatus: string;
    citizenship: string;
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
}

// Define the User interface
interface User {
    id: number;
    UserProfile: UserProfile;
}

// Define the TransmigrationData interface
interface TransmigrationData {
    id: number;
    user_id: number;
    submissionNumber: string;
    domicile: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    status: string;
    kk: string;
    createdAt: string;
    updatedAt: string;
    User: User;
    TransmigrationMembers: TransmigrationMember[];
}

// Define the API response interface
interface TransmigrationResponse {
    data: TransmigrationData;
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

const DetailTransmigrasi: React.FC<TransmigrationResponse> = ({ data }) => {
    const [isModalOpenKeluarga, setIsModalOpenKeluarga] = useState(false);
    const openModalKeluarga = () => setIsModalOpenKeluarga(true);
    const closeModalKeluarga = () => setIsModalOpenKeluarga(false);

    const [isModalOpenKTP, setIsModalOpenKTP] = useState(false);
    const openModalKTP = () => setIsModalOpenKTP(true);
    const closeModalKTP = () => setIsModalOpenKTP(false);


    return (
        <div>
            {/* Detail */}
            <div
                className={`w-full py-3 mb-4 text-center font-medium rounded-full ${data?.status === 'Pengajuan' ? 'bg-[#656565]/20 text-[#656565]' :
                    data?.status === 'Proses' ? 'bg-[#FC6736]/20 text-[#FC6736]' :
                            data?.status === 'Diterima' ? 'bg-succes/20 text-succes' :
                                data?.status === 'Ditolak' ? 'bg-error/20 text-error' :
                                    'bg-gray-300 text-gray-700' // Default style
                    }`}
            >
                Status Transmigrasi : {data?.status ?? "-"}
            </div>
            <div className="wrap-all flex flex-col gap-6">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Profile Kependudukan
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="No Pengajuan" value={data?.submissionNumber} />
                            <ProfileDetail label="Nama" value={data?.User?.UserProfile?.name} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="NIK" value={data?.User?.UserProfile?.nik ?? "-"} />
                            <ProfileDetail label="Alamat Domisili" value={data?.User?.UserProfile?.address ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Kecamatan" value={data?.kecamatan ?? "-"} />
                            <ProfileDetail label="Kelurahan" value={data?.kelurahan ?? "-"} />
                        </div>
                    </div>
                </div>
                {/* Informasi Instansi */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Lokasi Transmigrasi
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Provinsi" value={data?.provinsi ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Kota/Kabupaten" value={data?.kabupaten ?? "-"} />
                        </div>
                    </div>
                </div>
                <div className="header bg-primary/20 text-primary rounded-lg p-3">
                    Anggota Jiwa
                </div>
                <div className="wrap grid md:grid-cols-2  grid-cols-1 gap-4">
                    {data?.TransmigrationMembers && data.TransmigrationMembers.length > 0 ? (
                        data.TransmigrationMembers.map((member, index) => (
                            // Anggota Jiwa
                            <div className="konten flex flex-col gap-4" key={member?.nik}>
                                <div className="wrap gap-8">
                                    {/* anggota */}
                                    <div className="anggota flex flex-col gap-3">
                                        <div className="head w-full rounded-full py-2 bg-primary text-center text-white">
                                            Anggota {index + 1}
                                        </div>
                                        <div className="wrap">
                                            <div className="label text-[#3572EF]">NIK</div>
                                            <div className="teks text-sm">{member?.nik ?? "-"}</div>
                                        </div>
                                        <div className="wrap">
                                            <div className="label text-[#3572EF]">Nama</div>
                                            <div className="teks text-sm">{member?.name ?? "-"}</div>
                                        </div>
                                        <div className="wrap">
                                            <div className="label text-[#3572EF]">Jenis Kelamin</div>
                                            <div className="teks text-sm">{member?.gender ?? "-"}</div>
                                        </div>
                                        <div className="wrap">
                                            <div className="label text-[#3572EF]">Status Kartu Keluarga</div>
                                            <div className="teks text-sm">{member?.familyStatus ?? "-"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            Tidak ada data
                        </div>
                    )}
                </div>
                {/* upload kartu keluarga */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Dokumen Kartu Keluarga
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className="left w-1/2">
                                <div className="teks text-sm">
                                    <div className="w-full h-[350px] rounded-lg overflow-hidden cursor-pointer">
                                        <iframe
                                            allowFullScreen
                                            src={data?.User?.UserProfile?.kk}
                                            title="Manual Book"
                                            className="rounded-xl w-full h-full"
                                        >
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* upload kartu keluarga */}
                {/* KTP */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Dokumen KTP
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className="left w-1/2">
                                <div className="teks text-sm">
                                    <div className="w-full h-[350px] rounded-lg overflow-hidden cursor-pointer">
                                        <iframe
                                            allowFullScreen
                                            src={data?.User?.UserProfile?.ktp}
                                            title="Manual Book"
                                            className="rounded-xl w-full h-full"
                                        >
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* KTP */}

                {/* dokumen */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Dokumen Transmigrasi
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className="w-full h-[300px] items-center border border-line-stroke rounded-lg overflow-hidden cursor-pointer flex justify-center" onClick={openModalKTP}>
                                Dokumen Transmigrasi Sedang Dalam Proses!!
                            </div>
                        </div>
                    </div>
                </div>
                {/* dokumen */}
            </div>
            {/* Detail */}


        </div >
    );
};

export default DetailTransmigrasi;
