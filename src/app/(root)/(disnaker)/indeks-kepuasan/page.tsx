"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import PaginationTable from '@/components/PaginationTable';
import Unduh1icon from '../../../../../public/assets/icons/Unduh1icon';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Disnaker/IndeksKepuasan';
import BreadIndeks from '../../../../../public/assets/icons/BreadIndeks';

const IndeksKepuasan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Indeks Kepuasan', logo: <BreadIndeks /> },
    ];

    // Dummy data
    const dummyData = [
        {
            no: 1,
            nama: "John Doe",
            tanggal: "23 Desember 2023",
            nik: "123456789",
            email: "john@mail.com",
        },
        {
            no: 2,
            nama: "Jane Smith",
            tanggal: "15 Januari 2024",
            nik: "987654321",
            email: "jane@mail.com",
        },
        {
            no: 3,
            nama: "Ahmad Santoso",
            tanggal: "10 Februari 2024",
            nik: "123123123",
            email: "ahmad@mail.com",
        },
        {
            no: 4,
            nama: "Linda Hartono",
            tanggal: "5 Maret 2024",
            nik: "321321321",
            email: "linda@mail.com",
        },
        {
            no: 5,
            nama: "Rudi Pratama",
            tanggal: "20 April 2024",
            nik: "456456456",
            email: "rudi@mail.com",
        },
    ];


    // 
    // Define table headers
    const tableHeaders = ["No", "Nama", "Tanggal", "NIK", "Email", "Aksi"];
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
                <Input
                    type='date'
                    placeholder='Tanggal Awal'
                />
                <Input
                    type='date'
                    placeholder='Tanggal Akhir'
                />
                <Button className='flex gap-3 items-center px-10'>
                    <Unduh1icon />
                    Unduh PDF
                </Button>
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

export default IndeksKepuasan