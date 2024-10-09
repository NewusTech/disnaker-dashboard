import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import BreadIndeks from '../../../../../../public/assets/icons/BreadIndeks';
import Event from '@/components/Disnaker/Event/Detail';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Event', logo: <BreadIndeks />, href:"/event" },
        { label: 'Detail Event' },
    ];

    const dummyData = {
            judul: "Career Fair Tanggamus 2024",
            tanggalBuat: "23 Februari 2024",
            banner: "https://cdc.ui.ac.id/wp-content/uploads/2024/01/Artboard-71.png",
            deskripsi: "Temukan berbagai kesempatan kerja menarik di Career Fair Tanggamus 2024! Hadiri acara ini untuk berinteraksi langsung dengan perusahaan-perusahaan terkemuka dari berbagai sektor industri, yang siap merekrut talenta berbakat seperti kamu. Acara ini memberikan kesempatan unik untuk membangun jaringan profesional, mendapatkan wawasan karier, dan bahkan mengikuti wawancara kerja langsung di tempat. Jangan lewatkan peluang emas untuk memajukan kariermu dan menemukan pekerjaan impian hanya di Career Fair Tanggamus!",
            tempat: "Gedung A",
            jam: "11:00 Wib - 15:00 Wib",
            tanggalMulai: "23 Desember 2024",
            tanggalSelesai: "26 Desember 2024",
            kategori: "Pelatihan",
            link: "https://cdc.ui.ac.id/wp-content/uploads/2024/01/Artboard-71.png",
        }
    

    return (
        <div>
            {/* Top */}
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/event"
                className="flex gap-2 items-center mt-5 px-5 py-3 bg-primary rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <Garis />
            {/* Top */}
            {/* Detail */}
            <Event data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
