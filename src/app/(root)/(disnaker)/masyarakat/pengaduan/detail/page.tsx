import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BreadMasyarakat from '../../../../../../../public/assets/icons/MasyarakatBread';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailPengaduan from '@/components/admin/Pengaduan/detail';

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
        { label: 'Pengaduan', href: '/masyarakat/pengaduan' },
        { label: 'Detail Pengaduan' },
    ];

    const dummyData = {
        nama: "Irsyad Abi Izzulhaq",
        judul: "Proses Kartu Kuning Lambat",
        deskripsi: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
        tanggal: "24 - Februari - 2000",
        foto: "https://radarlampung.disway.id/upload/60451837b04fbd0259e0ffb04545f88a.jpg",
    };

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/masyarakat/pengaduan"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <DetailPengaduan data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
