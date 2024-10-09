import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BreadMasyarakat from '../../../../../../../public/assets/icons/MasyarakatBread';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailMasyarakat from '@/components/admin/AkunMasyarakat/Detail';

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
        { label: 'Akun Masyarakat', href: '/masyarakat/akun-masyarakat' },
        { label: 'Detail Akun Masyarakat' },
    ];

    const dummyData = {
        nik: "1871032302000006",
        alamat: "Sukarame, Bandar Lampung",
        nama: "Irsyad Abi Izzulhaq",
        agama: "Islam",
        tempatLahir: "Bandar Lampung",
        statusPerkawinan: "Belum Kawin",
        tanggalLahir: "23 - Februari 2002",
        pekerjaan: "Programmer",
        namaInstansi: "Universitas Teknokrat Indonesia",
        jurusan: "Informatika",
        keterampilan: "UI/UX Design, Front End Developer, Back End Developer dan Graphic Design",
        email: "Irsyad@gmail.com",
        foto: "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727913600&semt=ais_hybrid",
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
            <DetailMasyarakat data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
