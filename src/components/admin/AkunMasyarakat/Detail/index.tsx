"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Define the structure of the data props
interface DetailMasyarakatProps {
    data: {
        nama: string;
        nik: string;
        alamat: string;
        agama: string;
        tempatLahir: string;
        statusPerkawinan: string;
        tanggalLahir: string;
        noTelepon: string;
        namaInstansi: string;
        jurusan: string;
        keterampilan: string;
        email: string;
        kartuKeluarga: string;
        foto: string;
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

const DetailMasyarakat: React.FC<DetailMasyarakatProps> = ({ data }) => {
    const [isModalOpenKeluarga, setIsModalOpenKeluarga] = useState(false);
    const openModalKeluarga = () => setIsModalOpenKeluarga(true);
    const closeModalKeluarga = () => setIsModalOpenKeluarga(false);

    const [isModalOpenFoto, setIsModalOpenFoto] = useState(false);
    const openModalFoto = () => setIsModalOpenFoto(true);
    const closeModalFoto = () => setIsModalOpenFoto(false);

    return (
        <div>
            {/* Detail */}
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
                            <ProfileDetail label="Alamat" value={data.alamat} />
                            <ProfileDetail label="Agama" value={data.agama} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tempat Lahir" value={data.tempatLahir} />
                            <ProfileDetail label="Status Perkawinan" value={data.statusPerkawinan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Lahir" value={data.tanggalLahir} />
                            <ProfileDetail label="No Telepon" value={data.noTelepon} />
                        </div>
                    </div>
                </div>
                {/* Informasi Instansi */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Pendidikan dan Keterampilan
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama Instansi" value={data.namaInstansi} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jurusan" value={data.jurusan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Keterampilan" value={data.keterampilan} />
                        </div>
                    </div>
                </div>
                {/* Akun */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Akun
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Email" value={data.email} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    {/* Foto */}
                    <div className="wrap w-1/2 flex flex-col gap-4">
                        <div className="header bg-primary/20 text-primary rounded-lg p-3">
                            Foto Profile
                        </div>
                        <div className="konten flex flex-col gap-4">
                            <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalFoto}>
                                <Image
                                    src={data.foto}
                                    alt="Foto User"
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={300}
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                    {/* Foto */}
                    {/* upload kartu keluarga */}
                    <div className="wrap w-1/2 flex flex-col gap-4">
                        <div className="header bg-primary/20 text-primary rounded-lg p-3">
                            Foto Kartu Keluarga
                        </div>
                        <div className="konten flex flex-col gap-4">
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
                    {/* upload kartu keluarga */}
                </div>
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
            {/* Foto Modal */}
            {isModalOpenFoto && (
                <div onClick={closeModalFoto} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalFoto}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={data.foto}
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
            {/* Foto Modal */}
        </div>
    );
};

export default DetailMasyarakat;
