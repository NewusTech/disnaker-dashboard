"use client"

import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailKartuKuning from '@/components/admin/KartuKuning/detail';
import BreadPelayanan from '../../../../../../../../public/assets/icons/BreadPelayanan';
import LoadingPage from '@/components/ui/LoadingPage';
import { useParams } from 'next/navigation';
import { useGetKartuKuningGetId } from '@/api';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Pelayanan', logo: <BreadPelayanan /> },
        { label: 'Kartu Kuning', href: '/pelayanan/kartu-kuning' },
        { label: 'Detail Kartu Kuning' },
    ];

    
    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetKartuKuningGetId(id as string);

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
                href="/pelayanan/kartu-kuning"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <DetailKartuKuning data={data?.data} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
