"use client"

import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailPengaduan from '@/components/admin/Pengaduan/detail';
import BreadPelayanan from '../../../../../../../../public/assets/icons/BreadPelayanan';
import LoadingPage from '@/components/ui/LoadingPage';
import { useGetPengaduanGetId } from '@/api';
import { useParams } from 'next/navigation';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Pelayanan', logo: <BreadPelayanan /> },
        { label: 'Pengaduan', href: '/pelayanan/pengaduan' },
        { label: 'Detail Pengaduan' },
    ];

    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetPengaduanGetId(id as string);

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
                href="/pelayanan/pengaduan"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <DetailPengaduan data={data?.data} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
