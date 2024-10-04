import React from 'react';
import Image from 'next/image';

// Define the structure of the data props
interface DetailKartuKuningProps {
    data: {
        nik: string;
        alamat: string;
        nama: string;
        agama: string;
        tempatLahir: string;
        statusPerkawinan: string;
        tanggalLahir: string;
        pekerjaan: string;
        namaInstansi: string;
        jurusan: string;
        keterampilan: string;
        email: string;
        foto: string; // URL for the user's photo
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

const DetailKartuKuning: React.FC<DetailKartuKuningProps> = ({ data }) => {
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
                            <ProfileDetail label="NIK" value={data.nik} />
                            <ProfileDetail label="Alamat" value={data.alamat} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama" value={data.nama} />
                            <ProfileDetail label="Agama" value={data.agama} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tempat Lahir" value={data.tempatLahir} />
                            <ProfileDetail label="Status Perkawinan" value={data.statusPerkawinan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Lahir" value={data.tanggalLahir} />
                            <ProfileDetail label="Pekerjaan" value={data.pekerjaan} />
                        </div>
                    </div>
                </div>
                {/* Informasi Instansi */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Profile Instansi
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
                {/* Foto */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Foto
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <div className="w-[300px] h-[300px] rounded-lg overflow-hidden">
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
                </div>
            </div>
            {/* Detail */}
        </div>
    );
};

export default DetailKartuKuning;
