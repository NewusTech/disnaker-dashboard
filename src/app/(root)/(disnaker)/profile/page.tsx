"use client";
import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import Pelatihan from '@/components/Disnaker/Ketenagakerjaan/Pelatihan/Detail';
import { useParams } from 'next/navigation';
import { useGetPelatihanGetId } from '@/api';
import LoadingPage from '@/components/ui/LoadingPage';
import BackIcon from '../../../../../public/assets/icons/BackIcon';
import BreadInformasi from '../../../../../public/assets/icons/BreadInformasi';

const Profile: React.FC = () => {
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
            <Garis />
            {/* Detail */}
            {/* <Pelatihan data={data?.data} /> */}
            {/* Detail */}
        </div>
    );
};

export default Profile;
