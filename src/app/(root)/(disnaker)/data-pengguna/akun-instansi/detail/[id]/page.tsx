"use client";
import React, { useState } from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGetInstansiGetId } from '@/api';
import LoadingPage from '@/components/ui/LoadingPage';
import Image from 'next/image';
import ProfileIcon from '../../../../../../../../public/assets/icons/ProfileIcon';

const Profile: React.FC = () => {
    const [isModalOpenBanner, setIsModalOpenBanner] = useState(false);
    const openModalBanner = () => setIsModalOpenBanner(true);
    const closeModalBanner = () => setIsModalOpenBanner(false);
    // 
    const [isModalOpenLogo, setIsModalOpenLogo] = useState(false);
    const openModalLogo = () => setIsModalOpenLogo(true);
    const closeModalLogo = () => setIsModalOpenLogo(false);

    const breadcrumbItems = [
        { label: 'Profile' },
    ];

    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetInstansiGetId(id as string);

    if (isLoading) {
        return <div >
            <LoadingPage />
        </div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Failed to load data</div>;
    }

    const dataComp = data?.data;

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            {/* Detail */}
            <div className="flex justify-between items-center my-6">
                <div className="left text-xl">
                    Profile Instansi
                </div>
            </div>
            {/* card */}
            <div className="wrap-c flex flex-col gap-4 bg-white rounded-lg border border-line-stroke p-5">
                <div className="header relative">
                    <div className="foto w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalBanner}>
                        <Image
                            src={dataComp?.imageBanner ?? "-"}
                            alt="Foto User"
                            className="object-cover w-full h-full"
                            width={800}
                            height={800}
                            unoptimized
                        />
                    </div>
                    <div className="logo absolute left-1/2 transform -translate-x-1/2 bottom-[-100px]">
                        <div className="w-[200px] overflow-hidden h-[200px] rounded-full cursor-pointer" onClick={openModalLogo}>
                            <Image
                                src={dataComp?.imageLogo ?? "-"}
                                alt="Foto User"
                                className="object-cover w-full h-full"
                                width={300}
                                height={300}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="tent mt-36 flex flex-col gap-3">
                    <div className="font-medium text-xl mb-3">
                        Tentang Perusahaan
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Deskripsi</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">
                            <div
                                className="prose max-w-none text-justify"
                                dangerouslySetInnerHTML={{ __html: dataComp?.desc || "Tidak Ada Deskripsi" }}
                            />
                        </div>
                    </div>
                    <div className="h-[1px] bg-line-stroke w-full my-5"></div>
                </div>
                <div className="informasi  flex flex-col gap-3">
                    <div className="font-medium text-xl mb-3">
                        Informasi Umum Perusahaan
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Nama Perusahaan</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.name ?? "-"}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Jenis Perusahaan</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.department ?? "-"}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Alamat</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.address ?? "-"}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Website</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                    dataComp?.website && (dataComp?.website.startsWith('http://') || dataComp?.website.startsWith('https://'))
                                        ? dataComp.website // Pastikan ini adalah string
                                        : `https://${dataComp?.website}` // Gantilah jika website tidak diawali dengan http
                                }
                                className="teks text-[#3D3D3D] hover:text-primary underline"
                            >
                                {dataComp?.website ?? "-"}
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Total Karyawan</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.numberEmployee ?? "-"} Karyawan</div>
                    </div>
                    <div className="h-[1px] bg-line-stroke w-full my-5"></div>
                </div>
                <div className="kontak flex flex-col gap-3">
                    <div className="font-medium text-xl mb-3">
                        Kontak Perusahaan
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Email</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.email ?? "-"}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Nomor Telepon</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">{dataComp?.phone ?? "-"}</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Instagram</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">
                        <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                    dataComp?.instagram && (dataComp?.instagram.startsWith('http://') || dataComp?.instagram.startsWith('https://'))
                                        ? dataComp?.instagram // Pastikan ini adalah string
                                        : `https://${dataComp?.instagram}` // Gantilah jika ?.instagram tidak diawali dengan http
                                }
                                className="teks text-[#3D3D3D] hover:text-primary underline"
                            >
                                {dataComp?.instagram ?? "-"}
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">LinkedIn</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">
                        <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                    dataComp?.linkedin && (dataComp?.linkedin.startsWith('http://') || dataComp?.linkedin.startsWith('https://'))
                                        ? dataComp?.linkedin // Pastikan ini adalah string
                                        : `https://${dataComp?.linkedin}` // Gantilah jika ?.linkedin tidak diawali dengan http
                                }
                                className="teks text-[#3D3D3D] hover:text-primary underline"
                            >
                                {dataComp?.linkedin ?? "-"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner Modal */}
            {isModalOpenBanner && (
                <div onClick={closeModalBanner} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalBanner}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={dataComp?.imageBanner ?? "-"}
                                alt={`banner`}
                                className="object-cover"
                                width={900}
                                height={900}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Banner Modal */}
            {/* Logo Modal */}
            {isModalOpenLogo && (
                <div onClick={closeModalLogo} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative bg-white p-4 rounded shadow-lg max-w-3xl"
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                    >
                        <button
                            aria-label="Close"
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                            onClick={closeModalLogo}
                        >
                            &times;
                        </button>
                        <div className="flex justify-center items-center">
                            <Image
                                src={dataComp?.imageLogo ?? "-"}
                                alt={`banner`}
                                className="object-cover"
                                width={400}
                                height={400}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Logo Modal */}
        </div>
    );
};

export default Profile;
