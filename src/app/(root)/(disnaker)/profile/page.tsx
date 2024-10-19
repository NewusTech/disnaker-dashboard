"use client";
import React, { useState } from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import Pelatihan from '@/components/Disnaker/Ketenagakerjaan/Pelatihan/Detail';
import { useParams } from 'next/navigation';
import { useGetPelatihanGetId } from '@/api';
import LoadingPage from '@/components/ui/LoadingPage';
import BackIcon from '../../../../../public/assets/icons/BackIcon';
import BreadInformasi from '../../../../../public/assets/icons/BreadInformasi';
import ProfileIcon from '../../../../../public/assets/icons/ProfileIcon';
import Image from 'next/image';

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
    // const { id } = useParams();
    // const { data, isLoading, error } = useGetPelatihanGetId(id as string);

    // if (isLoading) {
    //     return <div >
    //         <LoadingPage />
    //     </div>;
    // }

    // if (error) {
    //     return <div className="text-center mt-10 text-red-500">Failed to load data</div>;
    // }

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            {/* Detail */}
            <div className="flex justify-between items-center my-6">
                <div className="left text-xl">
                    Profile Perusahaan
                </div>
                <div className="right flex-shrink-0">
                    <Link
                        href="/profile/edit"
                        className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                        <ProfileIcon />
                        Edit Data Perusahaan
                    </Link>
                </div>
            </div>
            {/* card */}
            <div className="wrap-c flex flex-col gap-4 bg-white rounded-lg border border-line-stroke p-5">
                <div className="header relative">
                    <div className="foto w-full h-[300px] rounded-lg overflow-hidden cursor-pointer" onClick={openModalBanner}>
                        <Image
                            src={"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/banner-of-corporate-business-video-template-design-4aeb47753965b7cec523c2b00ea980d8_screen.jpg?ts=1588887552"}
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
                                src={"https://marketplace.canva.com/EAFjkmub8pY/1/0/1600w/canva-biru-oranye-simpel-profesional-perusahaan-media-dan-pers-logo-eU_eAsrRA1A.jpg"}
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
                        <div className="text-justify">PT Brigitte adalah perusahaan konsultan teknologi informasi yang berfokus pada pengembangan solusi IT inovatif untuk bisnis dan instansi pemerintahan. Dengan pengalaman bertahun-tahun, kami menyediakan layanan konsultasi, pengembangan sistem, dan dukungan teknologi.</div>
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
                        <div className="text-justify">PT. Brigtte</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Jenis Perusahaan</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">Konsultan Teknologi Informasi (IT Consultant)</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Alamat</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">Pusat: Jl. Pahlawan No. 27, Bandar Lampung</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Website</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">www.brigitteit.com </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Total Karyawan</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">1000 Karyawan</div>
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
                        <div className="text-justify">info@brigitteit.com</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Nomor Telepon</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">+62 721 123456</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Alamat</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">Pusat: Jl. Pahlawan No. 27, Bandar Lampung</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">Instagram</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify">@brigitteit</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="text-black/70 w-[160px] flex-shrink-0">LinkedIn</div>
                        <div className="text-black/70">:</div>
                        <div className="text-justify"> linkedin.com/company/brigitte-it</div>
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
                                src={"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/banner-of-corporate-business-video-template-design-4aeb47753965b7cec523c2b00ea980d8_screen.jpg?ts=1588887552"}
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
                                src={"https://marketplace.canva.com/EAFjkmub8pY/1/0/1600w/canva-biru-oranye-simpel-profesional-perusahaan-media-dan-pers-logo-eU_eAsrRA1A.jpg"}
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
