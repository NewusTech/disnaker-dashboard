"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import Link from 'next/link';
import DataTable from '@/components/Disnaker/Ketenagakerjaan/Pelatihan';
import BreadInformasi from '../../../../../../public/assets/icons/BreadInformasi';
import { useGetPelatihan } from '@/api';

const Pelatihan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Pelatihan' },
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
            judulPelatihan: "Pelatihan Marketing",
            kategori: "Marketing",
            tanggalMulai: "23 Desember 2023",
            tanggalSelesai: "26 Desember 2023",
            kuotaPeserta: "54",
        },
        {
            no: 2,
            namaInstansi: "PT. Teknologi Cerdas",
            judulPelatihan: "Pelatihan Pengembangan Aplikasi",
            kategori: "IT",
            tanggalMulai: "15 Januari 2024",
            tanggalSelesai: "20 Januari 2024",
            kuotaPeserta: "30",
        },
        {
            no: 3,
            namaInstansi: "Lembaga Pendidikan ABC",
            judulPelatihan: "Pelatihan Desain Grafis",
            kategori: "Desain",
            tanggalMulai: "5 Februari 2024",
            tanggalSelesai: "10 Februari 2024",
            kuotaPeserta: "40",
        },
        {
            no: 4,
            namaInstansi: "Yayasan Ilmu Digital",
            judulPelatihan: "Pelatihan Keuangan dan Akuntansi",
            kategori: "Keuangan",
            tanggalMulai: "18 Maret 2024",
            tanggalSelesai: "22 Maret 2024",
            kuotaPeserta: "25",
        },
        {
            no: 5,
            namaInstansi: "PT. Solusi Kreatif",
            judulPelatihan: "Pelatihan Manajemen Proyek",
            kategori: "Manajemen",
            tanggalMulai: "10 April 2024",
            tanggalSelesai: "14 April 2024",
            kuotaPeserta: "35",
        },
    ];

    // 
    // Define table headers
    const tableHeaders = ["No", "Nama Instansi", "Judul Pelatihan", "Kategori", "Tanggal Mulai", "Tanggal Selesai", "Kuota Peserta", "Aksi"];

    // Ensure statusLowongan is always a string
    const status = selectedValue === "semua" ? "" : selectedValue || ""; // Default to empty string if undefined
    // select

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };

    // serach
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };
    // serach

    // INTEGRASI
    const { data } = useGetPelatihan(currentPage, search, status);
    // INTEGRASI


    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3">
                <Input
                    placeholder='Pencarian'
                    leftIcon={<SearchIcon />}
                    value={search}
                    onChange={handleSearchChange}
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
                    href="/layanan-ketenagakerjaan/pelatihan/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Pelatihan
                </Link>
            </div>
            {/* table */}
            <div className="Table mt-3">
                <DataTable
                    headers={tableHeaders}
                    data={data?.data}
                    currentPage={currentPage}
                    search={search}
                    status={status}
                />
            </div>
            {/* table */}
            {/* pagination */}
            <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                <PaginationTable
                    currentPage={currentPage}
                    totalPages={data?.pagination?.totalPages as number}
                    onPageChange={onPageChange}
                />
            </div>
            {/* pagination */}
        </div>
    )
}

export default Pelatihan