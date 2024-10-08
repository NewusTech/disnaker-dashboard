import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BreadMasyarakat from '../../../../../../../public/assets/icons/MasyarakatBread';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailKartuKuning from '@/components/admin/KartuKuning/detail';

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

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Masyarakat', logo: <BreadMasyarakat /> },
        { label: 'Kartu Kuning', href: '/masyarakat/kartu-kuning' },
        { label: 'Detail Kartu Kuning' },
    ];

    const dummyData = {
        status: "Terbit",
        nama: "Irsyad Abi Izzulhaq",
        nik: "1871032302000006",
        alamat: "Sukarame, Bandar Lampung",
        kecamatan: "Bandar Lampung",
        kelurahan: "Belum Kawin",
        noPengajuan: "Belum Kawin",
        pendidikan: "23 - Februari 2002",
        keterampilan: "UI/UX Design, Front End Developer, Back End Developer dan Graphic Design",
        pekerjaan: "Programmer",
    };

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/masyarakat/akun-masyarakat"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <DetailKartuKuning data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
