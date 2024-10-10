"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import BreadMasyarakat from '../../../../../../public/assets/icons/MasyarakatBread';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/Disnaker/DataPengguna/AkunPengguna';
import Link from 'next/link';
import Tambah from '../../../../../../public/assets/icons/Tambah';

const DataPengguna = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Data Pengguna', logo: <BreadMasyarakat /> },
        { label: 'Akun Pengguna' },  // No logo 
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const statusOptions = [
        { label: "Semua", value: "semua" },
        { label: "Aktif", value: "aktif" },
        { label: "Tidak Aktif", value: "tidak aktif" },
    ];
    // select

    // Dummy data
    const dummyData = [
        {
            no: 1,
            nama: "John Doe",
            nik: "123456789",
            email: "john@example.com",
            noTelepon: "087453453453",
            status: "aktif",
        },
        {
            no: 2,
            nama: "Jane Smith",
            nik: "987654321",
            email: "jane@example.com",
            noTelepon: "087453453453",
            status: "Tidak Aktif",
        },
        {
            no: 3,
            nama: "Michael Johnson",
            nik: "112233445",
            email: "michael@example.com",
            noTelepon: "087453453453",
            status: "aktif",
        },
        {
            no: 4,
            nama: "Emily Davis",
            nik: "998877665",
            email: "emily@example.com",
            noTelepon: "087453453453",
            status: "Tidak Aktif",
        },
        {
            no: 5,
            nama: "Chris Lee",
            nik: "556677889",
            email: "chris@example.com",
            noTelepon: "087453453453",
            status: "aktif",
        },
    ];
    // 
    // Define table headers
    const tableHeaders = ["No", "Nama", "NIK", "Email", "No Telepon", "Status", "Aksi"];
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
                    label="Status Akun"
                    options={statusOptions}
                    placeholder="Status Akun"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    width="w-full"
                />
                <Link
                    href="/data-pengguna/akun-pengguna/tambah"
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                    <Tambah />
                    Tambah Pengguna
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

export default DataPengguna