import React from 'react';
import Breadcrumb from '@/components/BreadCrumb';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import Link from 'next/link';
import Garis from '@/components/ui/garis';
import Pelatihan from '@/components/Disnaker/Ketenagakerjaan/Pelatihan/Detail';
import BreadInformasi from '../../../../../../../public/assets/icons/BreadInformasi';

const Detail: React.FC = () => {
    const breadcrumbItems = [
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Pelatihan', href:"/layanan-ketenagakerjaan/pelatihan" },
        { label: 'Detail' },
    ];

    const dummyData = {
            judul: "Pelatihan Desain UI/UX",
            tanggalBuat: "23 Februari 2024",
            banner: "https://fkip.uniska-bjm.ac.id/wp-content/uploads/2018/06/BANNER-TRAINING.jpg",
            deskripsi: "Temukan berbagai kesempatan kerja menarik di Career Fair Tanggamus 2024! Hadiri acara ini untuk berinteraksi langsung dengan perusahaan-perusahaan terkemuka dari berbagai sektor industri, yang siap merekrut talenta berbakat seperti kamu. Acara ini memberikan kesempatan unik untuk membangun jaringan profesional, mendapatkan wawasan karier, dan bahkan mengikuti wawancara kerja langsung di tempat. Jangan lewatkan peluang emas untuk memajukan kariermu dan menemukan pekerjaan impian hanya di Career Fair Tanggamus!",
            namaInstansi: "Disnaker Tanggamus",
            kuotaPeserta: "115",
            level: "Rendah",
            noWA: "099248287482",
            tempat: "Gedung A",
            jam: "11:00 Wib - 15:00 Wib",
            tanggalMulai: "23 Desember 2024",
            tanggalSelesai: "26 Desember 2024",
            kategori: "Pelatihan",
            modul: "https://cdc.ui.ac.id/wp-content/uploads/2024/01/Artboard-71.png",
            link: "https://cdc.ui.ac.id/wp-content/uploads/2024/01/Artboard-71.png",
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
            {/* Top */}
            {/* Detail */}
            <Pelatihan data={dummyData} />
            {/* Detail */}
        </div>
    );
};

export default Detail;
