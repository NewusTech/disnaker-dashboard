"use client"

import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import BreadInformasi from '../../../../../../../../public/assets/icons/BreadInformasi';
import Konsultasi from '@/components/Disnaker/Ketenagakerjaan/Konsultasi/Detail';
import LoadingPage from '@/components/ui/LoadingPage';
import { useParams } from 'next/navigation';
import { useGetKonsultasiGetId } from '@/api';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Konsultasi', href: "/layanan-ketenagakerjaan/konsultasi" },
        { label: 'Detail' },
    ];

    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetKonsultasiGetId(id as string);

    if (isLoading) {
        return <div >
            <LoadingPage />
        </div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Failed to load data</div>;
    }


    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/layanan-ketenagakerjaan/konsultasi"
                className="flex gap-2 items-center mt-5 px-5 py-2.5 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <Konsultasi data={data?.data} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
