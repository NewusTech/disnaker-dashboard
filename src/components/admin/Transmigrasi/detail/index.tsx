"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Define the structure of the data props
interface DetailTransmigrasiProps {
    data: {
        status: string;
        nama: string;
        nik: string;
        alamat: string;
        kecamatan: string;
        kelurahan: string;
        noPengajuan: string;
        provinsi: string;
        kabupaten: string;
        kartuKeluarga: string;
        ktp: string;
        kartuKuning: string;
    };
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

const DetailTransmigrasi: React.FC<DetailTransmigrasiProps> = ({ data }) => {
    const [isModalOpenKeluarga, setIsModalOpenKeluarga] = useState(false);
    const openModalKeluarga = () => setIsModalOpenKeluarga(true);
    const closeModalKeluarga = () => setIsModalOpenKeluarga(false);

    const [isModalOpenKTP, setIsModalOpenKTP] = useState(false);
    const openModalKTP = () => setIsModalOpenKTP(true);
    const closeModalKTP = () => setIsModalOpenKTP(false);


    return (
        <div>
            {/* Detail */}
            <div className="status py-2 rounded-full w-full text-succes bg-succes/20 text-center mb-4">
                Status : {data.status}
            </div>
            <div className="wrap-all flex flex-col gap-6">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Profile Kependudukan
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama" value={data.nama} />
                            <ProfileDetail label="NIK" value={data.nik} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Alamat Domisili" value={data.alamat} />
                            <ProfileDetail label="Kecamatan" value={data.kecamatan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Kelurahan" value={data.kelurahan} />
                            <ProfileDetail label="No Pengajuan" value={data.noPengajuan} />
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
                            <ProfileDetail label="Provinsi" value={data.provinsi} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Kota/Kabupaten" value={data.kabupaten} />
                        </div>
                    </div>
                </div>
                {/* Anggota Jiwa */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Anggota Jiwa
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap grid grid-cols-2 gap-8">
                            {/* anggota */}
                            <div className="anggota flex flex-col gap-3">
                                <div className="head w-full rounded-full py-2 bg-primary text-center text-white">
                                    Anggota 1
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">NIK</div>
                                    <div className="teks text-sm">1817318717281</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Nama</div>
                                    <div className="teks text-sm">Irsyad Abi Izzulhaq</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Jenis Kelamin</div>
                                    <div className="teks text-sm">Laki -Laki</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Status Kartu Keluarga</div>
                                    <div className="teks text-sm">Ayah</div>
                                </div>
                            </div>
                            {/* anggota */}
                            <div className="anggota flex flex-col gap-3">
                                <div className="head w-full rounded-full py-2 bg-primary text-center text-white">
                                    Anggota 2
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">NIK</div>
                                    <div className="teks text-sm">1817318717281</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Nama</div>
                                    <div className="teks text-sm">Irsyad Abi Izzulhaq</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Jenis Kelamin</div>
                                    <div className="teks text-sm">Laki -Laki</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Status Kartu Keluarga</div>
                                    <div className="teks text-sm">Ayah</div>
                                </div>
                            </div>
                            {/* anggota */}
                            <div className="anggota flex flex-col gap-3">
                                <div className="head w-full rounded-full py-2 bg-primary text-center text-white">
                                    Anggota 3
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">NIK</div>
                                    <div className="teks text-sm">1817318717281</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Nama</div>
                                    <div className="teks text-sm">Irsyad Abi Izzulhaq</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Jenis Kelamin</div>
                                    <div className="teks text-sm">Laki -Laki</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Status Kartu Keluarga</div>
                                    <div className="teks text-sm">Ayah</div>
                                </div>
                            </div>
                            {/* anggota */}
                            <div className="anggota flex flex-col gap-3">
                                <div className="head w-full rounded-full py-2 bg-primary text-center text-white">
                                    Anggota 4
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">NIK</div>
                                    <div className="teks text-sm">1817318717281</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Nama</div>
                                    <div className="teks text-sm">Irsyad Abi Izzulhaq</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Jenis Kelamin</div>
                                    <div className="teks text-sm">Laki -Laki</div>
                                </div>
                                <div className="wrap">
                                    <div className="label text-[#3572EF]">Status Kartu Keluarga</div>
                                    <div className="teks text-sm">Ayah</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalKeluarga}>
                                        <Image
                                            src={data.kartuKeluarga}
                                            alt="Foto User"
                                            className="object-cover w-full h-full"
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />
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
                                    <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalKTP}>
                                        <Image
                                            src={data.ktp}
                                            alt="Foto User"
                                            className="object-cover w-full h-full"
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />
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

            {/* Keluarga Modal */}
            {isModalOpenKeluarga && (
                <div onClick={closeModalKeluarga} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalKeluarga}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data.kartuKeluarga}
                                alt={`Full-size photo of user`}
                                className="object-cover"
                                width={600}
                                height={600}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Keluarga Modal */}
            {/* KTP Modal */}
            {isModalOpenKTP && (
                <div onClick={closeModalKTP} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalKTP}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data.ktp}
                                alt={`Full-size photo of user`}
                                className="object-cover"
                                width={600}
                                height={600}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* KTP Modal */}

        </div>
    );
};

export default DetailTransmigrasi;
