"use client";
import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import Pelatihan from '@/components/Disnaker/Ketenagakerjaan/Pelatihan/Detail';
import BreadInformasi from '../../../../../../../../public/assets/icons/BreadInformasi';
import { useParams } from 'next/navigation';
import { useGetPelatihanGetId } from '@/api';
import LoadingPage from '@/components/ui/LoadingPage';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Pelatihan', href: "/layanan-ketenagakerjaan/pelatihan" },
        { label: 'Detail' },
    ];

    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetPelatihanGetId(id as string);

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
                href="/layanan-ketenagakerjaan/pelatihan"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Detail */}
            <Pelatihan data={data?.data} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
