import React from 'react';
import Image from 'next/image';

// Define the structure of the data props
interface DetailKartuKuningProps {
    data: {
        status: string;
        nama: string;
        nik: string;
        alamat: string;
        kecamatan: string;
        kelurahan: string;
        noPengajuan: string;
        pekerjaan: string;
        pendidikan: string;
        keterampilan: string;
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
                        Pendidikan dan Keterampilan
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Pendidikan Terakhir" value={data.pendidikan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Keterampilan" value={data.keterampilan} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Pekerjaan" value={data.pekerjaan} />
                        </div>
                    </div>
                </div>
                {/* Akun */}
                <div className="wrap flex flex-col gap-4">
                    <div className="header bg-primary/20 text-primary rounded-lg p-3">
                        Dokumen Kartu Kuning
                    </div>
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            {/* <ProfileDetail label="Email" value={data.email} /> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}
        </div>
    );
};

export default DetailKartuKuning;
