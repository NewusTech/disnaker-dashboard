"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Garis from '@/components/ui/garis';
import PengaduanPopup from '@/components/PengaduanPopup';
import TerimaPengaduan from '@/components/TerimaPengaduan';
import TolakPengaduan from '@/components/TolakPengaduan';

// Define the structure of the data props
interface DetailPengaduanProps {
    data: {
        nama: string;
        judul: string;
        deskripsi: string;
        tanggal: string;
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
        <div className="teks text-sm text-justify">{value}</div>
    </div>
);

const DetailPengaduan: React.FC<DetailPengaduanProps> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // API function to handle the 'Terima' action
    const handleTerimaPengaduan = async (payload: { status: string; keterangan: string }) => {
        try {
            // await axiosPrivate.post("/validasi/korluh-padi/kab", payload);
            // alert
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Data berhasil divalidasi!',
            //     text: 'Data sudah disimpan sistem!',
            //     timer: 1500,
            //     timerProgressBar: true,
            //     showConfirmButton: false,
            //     showClass: {
            //         popup: 'animate__animated animate__fadeInDown',
            //     },
            //     hideClass: {
            //         popup: 'animate__animated animate__fadeOutUp',
            //     },
            //     customClass: {
            //         title: 'text-2xl font-semibold text-green-600',
            //         icon: 'text-green-500 animate-bounce',
            //         timerProgressBar: 'bg-gradient-to-r from-blue-400 to-green-400', // Gradasi warna yang lembut
            //     },
            //     backdrop: `rgba(0, 0, 0, 0.4)`,
            // });
            // alert
            console.log(payload)
            // push
            console.log("Success to validasi Padi:");
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memvalidasi data!';
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Terjadi kesalahan!',
            //     text: errorMessage,
            //     showConfirmButton: true,
            //     showClass: { popup: 'animate__animated animate__fadeInDown' },
            //     hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            //     customClass: {
            //         title: 'text-2xl font-semibold text-red-600',
            //         icon: 'text-red-500 animate-bounce',
            //     },
            //     backdrop: 'rgba(0, 0, 0, 0.4)',
            // });
            console.error("Failed to create user:", error);
        } finally {
            // setLoading(false); // Set loading to false once the process is complete
        }
        // mutate(`/validasi/korluh-padi/kab?bulan=${tahun}/${bulan}`);
    };

    return (
        <div>
            {/* Detail */}
            <div className="wrap-all flex flex-col gap-6">
                {/* Informasi Instansi */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama" value={data.nama} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Judul" value={data.judul} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Deksripsi" value={data.deskripsi} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Pengaduan" value={data.tanggal} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <div className="left w-1/2">
                                <div className="label text-[#3572EF]">Foto</div>
                                <div className="teks text-sm">
                                    <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModal}>
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
                </div>
                <Garis />
                <div className="wrap flex justify-center gap-3">
                    <div className="">
                        <TolakPengaduan onTolak={handleTerimaPengaduan} />
                    </div>
                    <div className="">
                        <TerimaPengaduan onTerima={handleTerimaPengaduan} />
                    </div>
                </div>
            </div>

            {/* Manual Modal */}
            {isModalOpen && (
                <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModal}
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

        </div>
    );
};

export default DetailPengaduan;
