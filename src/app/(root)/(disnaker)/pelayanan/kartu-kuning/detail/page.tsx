import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import DetailKartuKuning from '@/components/admin/KartuKuning/detail';
import BreadPelayanan from '../../../../../../../public/assets/icons/BreadPelayanan';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Pelayanan', logo: <BreadPelayanan /> },
        { label: 'Kartu Kuning', href: '/pelayanan/kartu-kuning' },
        { label: 'Detail Kartu Kuning' },
    ];

    const dummyData = {
        status: "Terbit",
        nama: "Irsyad Abi Izzulhaq",
        nik: "1871032302000006",
        alamat: "Sukarame, Bandar Lampung",
        kecamatan: "Bandar Lampung",
        kelurahan: "Belum Kawin",
        noPengajuan: "345346457",
        pendidikan: "23 - Februari 2002",
        keterampilan: "UI/UX Design, Front End Developer, Back End Developer dan Graphic Design",
        pekerjaan: "Programmer",
        kartuKeluarga : "https://www.bhuanajaya.desa.id/wp-content/uploads/images/kartu-keluarga-kk-82000_1080x675.webp",
        ktp : "https://umsu.ac.id/artikel/wp-content/uploads/2023/11/cara-mudah-cek-ktp-asli-atau-palsu.jpeg",
        kartuKuning : "-",
    };

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
            <DetailKartuKuning data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
