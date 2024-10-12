"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import Link from 'next/link';
import BreadInformasi from '../../../../../../public/assets/icons/BreadInformasi';
import DataTable from '@/components/Disnaker/Ketenagakerjaan/Konsultasi';

const Konsultasi = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Konsultasi' },
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const kategoriOptions = [
        { label: "Semua", value: "semua" },
        { label: "Marketing", value: "Marketing" },
        { label: "Teknologi", value: "Teknologi" },
        { label: "Kesehatan", value: "Kesehatan" },
        { label: "Pendidikan", value: "Pendidikan" },
    ];
    // select

    // Dummy data
    const dummyData = [
        {
            no: 1,
            namaInstansi: "CV. Creative Digital",
            judulKonsultasi: "Konsultasi Marketing",
            kategori: "Marketing",
            tanggalMulai: "23 Desember 2023",
            tanggalSelesai: "26 Desember 2023",
            kuotaPeserta: "54",
        },
        {
            no: 2,
            namaInstansi: "PT. Teknologi Cerdas",
            judulKonsultasi: "Konsultasi Pengembangan Aplikasi",
            kategori: "IT",
            tanggalMulai: "15 Januari 2024",
            tanggalSelesai: "20 Januari 2024",
            kuotaPeserta: "30",
        },
        {
            no: 3,
            namaInstansi: "Lembaga Pendidikan ABC",
            judulKonsultasi: "Konsultasi Desain Grafis",
            kategori: "Desain",
            tanggalMulai: "5 Februari 2024",
            tanggalSelesai: "10 Februari 2024",
            kuotaPeserta: "40",
        },
        {
            no: 4,
            namaInstansi: "Yayasan Ilmu Digital",
            judulKonsultasi: "Konsultasi Keuangan dan Akuntansi",
            kategori: "Keuangan",
            tanggalMulai: "18 Maret 2024",
            tanggalSelesai: "22 Maret 2024",
            kuotaPeserta: "25",
        },
        {
            no: 5,
            namaInstansi: "PT. Solusi Kreatif",
            judulKonsultasi: "Konsultasi Manajemen Proyek",
            kategori: "Manajemen",
            tanggalMulai: "10 April 2024",
            tanggalSelesai: "14 April 2024",
            kuotaPeserta: "35",
        },
    ];

    // 
    // Define table headers
    const tableHeaders = ["No", "Nama Instansi", "Judul Konsultasi", "Kategori", "Tanggal Mulai", "Tanggal Selesai", "Kuota Peserta", "Aksi"];
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
                    href="/layanan-ketenagakerjaan/konsultasi/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Konsultasi
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

export default Konsultasi