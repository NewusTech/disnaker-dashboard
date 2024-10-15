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
import { useGetEvent } from '@/api';

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

    // Define table headers
    const tableHeaders = ["No", "Nama Program", "Deskripsi", "Kategori", "Tanggal Mulai", "Tanggal Selesai", "Aksi"];
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
    const { data } = useGetEvent(currentPage, search, status);
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
                    href="/event/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Event
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

export default Event