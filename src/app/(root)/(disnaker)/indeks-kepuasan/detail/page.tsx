import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import Indeks from '@/components/Disnaker/IndeksKepuasan/Detail';
import BreadIndeks from '../../../../../../public/assets/icons/BreadIndeks';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Indeks Kepuasan', logo: <BreadIndeks />, href:"/indeks-kepuasan" },
        { label: 'Detail Indeks Kepuasan' },
    ];

    const dummyData = {
        nama: "Irsyad Abi Izzulhaq",
        jawaban1: "Cukup Baik",
        jawaban2: "Sangat Baik",
        jawaban3: "Cukup Baik",
        jawaban4: "Cukup Baikv",
        jawaban5: "Sangat Baik",
        jawaban6: "Sangat Baik",
        kritikSaran: " Aplikasi sudah bagus dan sangat membantu. Saran dari saya pelayanannya lebih cepat  Aplikasi sudah bagus dan sangat membantu. Saran dari saya pelayanannya lebih cepat.  Aplikasi sudah bagus dan sangat membantu. Saran dari saya pelayanannya lebih cepat. ",
    };

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/indeks-kepuasan"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <Indeks data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
