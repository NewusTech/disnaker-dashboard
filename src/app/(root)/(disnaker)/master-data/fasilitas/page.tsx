"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Link from 'next/link';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import { useGetFasilitas } from '@/api';
import DataTable from '@/components/Disnaker/MasterData/Fasilitas';
import BreadMaster from '../../../../../../public/assets/icons/BreadMaster';

const Fasilitas = () => {
    const breadcrumbItems = [
        { label: 'Master Data', logo: <BreadMaster /> },
        { label: 'Fasilitas' },
    ];

    // Define table headers
    const tableHeaders = ["No", "Judul", "Foto", "Aksi"];


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
    const { data } = useGetFasilitas(currentPage, search);
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
                <Link
                    href="/master-data/fasilitas/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Fasilitas
                </Link>
            </div>
            {/* table */}
            <div className="Table mt-3">
                <DataTable
                    headers={tableHeaders}
                    data={data?.data}
                    currentPage={currentPage}
                    search={search}
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

export default Fasilitas