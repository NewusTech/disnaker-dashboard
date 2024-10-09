"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Unduh1icon from '../../../../../public/assets/icons/Unduh1icon';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Disnaker/Event';
import BreadEvent from '../../../../../public/assets/icons/BreadEvent';
import Tambah from '../../../../../public/assets/icons/Tambah';
import Link from 'next/link';

const Event = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Event', logo: <BreadEvent /> },
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const kategoriOptions = [
        { label: "Semua", value: "semua" },
        { label: "Sertifikasi", value: "Sertifikasi" },
        { label: "Pelatihan", value: "Pelatihan" },
        { label: "Event", value: "Event" },
        { label: "Konsultasi", value: "Konsultasi" },
    ];
    // select

    // Dummy data
    const dummyData = [
        {
            no: 1,
            nama: "Sertifikasi UI Design",
            deskripsi: "Pelatihan untuk mengembangkan kemampuan desain antarmuka.",
            tanggalMulai: "23 Desember 2023",
            tanggalSelesai: "26 Desember 2023",
            kategori: "Sertifikasi",
        },
        {
            no: 2,
            nama: "Workshop ReactJS",
            deskripsi: "Workshop intensif mengenai pengembangan aplikasi dengan ReactJS.",
            tanggalMulai: "10 Januari 2024",
            tanggalSelesai: "12 Januari 2024",
            kategori: "Pelatihan",
        },
        {
            no: 3,
            nama: "Pelatihan Digital Marketing",
            deskripsi: "Pelatihan tentang strategi pemasaran digital.",
            tanggalMulai: "5 Februari 2024",
            tanggalSelesai: "7 Februari 2024",
            kategori: "Pelatihan",
        },
        {
            no: 4,
            nama: "Sertifikasi Python Programming",
            deskripsi: "Sertifikasi untuk meningkatkan kemampuan pemrograman Python.",
            tanggalMulai: "15 Maret 2024",
            tanggalSelesai: "18 Maret 2024",
            kategori: "Sertifikasi",
        },
        {
            no: 5,
            nama: "Seminar AI dan Machine Learning",
            deskripsi: "Seminar tentang penerapan AI dan Machine Learning di berbagai industri.",
            tanggalMulai: "20 April 2024",
            tanggalSelesai: "22 April 2024",
            kategori: "Seminar",
        },
    ];



    // 
    // Define table headers
    const tableHeaders = ["No", "Nama Program", "Deskripsi", "Kategori", "Tanggal Mulai", "Tanggal Selesai", "Aksi"];
    // pagination
    const [currentPage, setCurrentPage] = useState(3);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };
    // pagination


    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3">
                <Input
                    placeholder='Pencarian'
                    leftIcon={<SearchIcon />}
                />
                <CustomSelect
                    label="Kategori"
                    options={kategoriOptions}
                    placeholder="Kategori"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    width="w-full"
                />
                <Link
                    href="/event/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Event
                </Link>
            </div>
            {/* table */}
            <div className="Table mt-3">
                <DataTable
                    headers={tableHeaders}
                    data={dummyData}
                />
            </div>
            {/* table */}
            {/* pagination */}
            <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                <PaginationTable
                    currentPage={1}
                    totalPages={15}
                    onPageChange={onPageChange}
                />
            </div>
            {/* pagination */}
        </div>
    )
}

export default Event