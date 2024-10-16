"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Link from 'next/link';
import DataTable from '@/components/Disnaker/Berita';
import Tambah from '../../../../../public/assets/icons/Tambah';
import BreadBerita from '../../../../../public/assets/icons/BreadBerita';
import { useGetBerita } from '@/api';

const Berita = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Berita', logo: <BreadBerita /> },
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const kategoriOptions = [
        { label: "Semua", value: "semua" },
        { label: "Daerah", value: "Daerah" },
        { label: "Nasional", value: "Nasional" },
    ];
    // select

    // Define table headers
    const tableHeaders = ["No", "Tanggal", "Judul", "Foto", "Aksi"];

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
    const { data } = useGetBerita(currentPage, search, status);
    // INTEGRASI


    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3 items-center">
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
                    href="/berita/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Berita
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

export default Berita