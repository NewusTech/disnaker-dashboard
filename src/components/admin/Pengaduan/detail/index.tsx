"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Garis from '@/components/ui/garis';
import PengaduanPopup from '@/components/PengaduanPopup';
import TerimaPengaduan from '@/components/TerimaPengaduan';
import TolakPengaduan from '@/components/TolakPengaduan';
import { useParams } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import { mutate } from 'swr';

// Define the structure of the data props
    interface UserComplaintResponse {
        data: ComplaintDetail;
    }
    
    interface ComplaintDetail {
        id: number;
        user_id: number;
        submissionNumber: string;
        title: string;
        desc: string;
        response: string | null;
        file: string | null;
        status: string;
        createdAt: string;
        updatedAt: string;
        User: User;
    }
    
    interface User {
        id: number;
        UserProfile: UserProfile;
    }
    
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
        location: string | null;
        profession: string;
        image: string;
        kk: string;
        ktp: string;
        employmentStatus: string;
        maritalStatus: string;
        citizenship: string;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
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

const DetailPengaduan: React.FC<UserComplaintResponse> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // API function to handle the 'Terima' action
    // Integrasi API
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const handleTerimaPengaduan = async (payload: { status: string; response: string }) => {
        try {
            await axiosPrivate.put(`/complaint/update/${id}`, payload);
            // alert
            showAlert('success', 'Pengaduan berhasil diperbarui!');
            // alert
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal memperbarui status!';
            showAlert('error', errorMessage);
        } finally {
            // setLoading(false); // Set loading to false once the process is complete
        }
        mutate(`/complaint/get/${id}`);
    };

    const handleTutupPengaduan = async (payload: { status: string; response: string }) => {
        try {
            await axiosPrivate.put(`/complaint/update/${id}`, payload);
            // alert
            showAlert('success', 'Pengaduan berhasil diperbarui!');
            // alert
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal memperbarui status!';
            showAlert('error', errorMessage);
        } finally {
            // setLoading(false); // Set loading to false once the process is complete
        }
        mutate(`/complaint/get/${id}`);
    };

    return (
        <div>
            {/* Detail */}
            <div className="wrap-all flex flex-col gap-6">
            <div
                className={`w-full py-3 text-center font-medium rounded-full ${data?.status === 'Pengajuan' ? 'bg-[#656565]/20 text-[#656565]' :
                    data?.status === 'Proses' ? 'bg-[#FC6736]/20 text-[#FC6736]' :
                            data?.status === 'Diterima' ? 'bg-succes/20 text-succes' :
                                data?.status === 'Ditutup' ? 'bg-error/20 text-error' :
                                    'bg-gray-300 text-gray-700' // Default style
                    }`}
            >
                Status Pengaduan : {data?.status ?? "-"}
            </div>
                {/* Informasi Instansi */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Nama" value={data?.User?.UserProfile?.name ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Judul" value={data?.title ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Deksripsi" value={data?.desc ?? "-"} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Tanggal Pengaduan" value={data?.createdAt ? new Date(data?.createdAt).toISOString().split('T')[0] : '-'} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <div className="left w-1/2">
                                <div className="label text-[#3572EF]">Foto</div>
                                <div className="teks text-sm">
                                    <div className="w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModal}>
                                        <Image
                                            src={data?.file ?? "https://i.sstatic.net/y9DpT.jpg"}
                                            alt="Foto Pengaduan"
                                            className="object-cover w-full h-full"
                                            width={300}
                                            height={300}
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Keterangan" value={data?.response ?? "-"} />
                        </div>
                    </div>
                </div>
                <Garis />
                <div className="wrap flex justify-center gap-3">
                    <div className="">
                        <TolakPengaduan onTolak={handleTutupPengaduan} />
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
                                src={data?.file ?? "https://i.sstatic.net/y9DpT.jpg"}
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
