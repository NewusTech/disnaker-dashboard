"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import BreadPerusahaan from '../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import DataTable from '@/components/Disnaker/Instansi/Lowongan';
import { useGetLowonganDisnaker } from '@/api';

const Lowongan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lowongan Pekerjaan' },  // No logo 
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const statusOptions = [
        { label: "Semua", value: "semua" },
        { label: "Publish", value: "published" },
        { label: "Tidak Publish", value: "not published" },
    ];

    // Ensure statusLowongan is always a string
    const statusLowongan = selectedValue === "semua" ? "" : selectedValue || ""; // Default to empty string if undefined
    // select

    // 
    // Define table headers
    const tableHeaders = ["No", "Nama Instansi", "Lowongan", "Tipe Pekerjaan", "Tanggal Posting", "Penutupan Lamaran", "Status", "Aksi"];

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
    const { data } = useGetLowonganDisnaker(currentPage, search, statusLowongan);
    // INTEGRASI

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-5 items-center">
                <Input
                    placeholder="Pencarian"
                    leftIcon={<SearchIcon />}
                    value={search}
                    onChange={handleSearchChange}
                />
                <CustomSelect
                    label="Status Akun"
                    options={statusOptions}
                    placeholder="Status Akun"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    width="w-full"
                />
                <Link
                    href="/instansi-disnaker/lowongan-pekerjaan/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Lowongan
                </Link>
            </div>
            {/* table */}
            <div className="Table mt-3">
                <DataTable
                    headers={tableHeaders}
                    data={data?.data}
                    currentPage={currentPage}
                    search={search}
                    statusLowongan={statusLowongan}
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

export default Lowongan