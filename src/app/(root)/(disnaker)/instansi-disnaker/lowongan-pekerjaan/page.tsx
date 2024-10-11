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
        { label: "Publish", value: "publish" },
        { label: "Tidak Publish", value: "tidak publish" },
    ];
    // select

    // Dummy data with 'instansi' added
    const dummyData = [
        {
            no: 1,
            instansi: "PT. Design Media",
            lowongan: "UI/UX Designer",
            tipe: "Full Time",
            tanggal: "2022-01-01",
            batas: "2022-01-10",
            penutup: "2022-01-15",
            status: "publish",
        },
        {
            no: 2,
            instansi: "PT. Teknologi Nusantara",
            lowongan: "Backend Developer",
            tipe: "Part Time",
            tanggal: "2022-02-01",
            batas: "2022-02-05",
            penutup: "2022-02-10",
            status: "tidak publish",
        },
        {
            no: 3,
            instansi: "PT. Software Indonesia",
            lowongan: "Frontend Developer",
            tipe: "Freelance",
            tanggal: "2022-03-01",
            batas: "2022-03-07",
            penutup: "2022-03-12",
            status: "publish",
        },
        {
            no: 4,
            instansi: "PT. Karya Prima",
            lowongan: "Project Manager",
            tipe: "Full Time",
            tanggal: "2022-04-01",
            batas: "2022-04-05",
            penutup: "2022-04-10",
            status: "publish",
        },
        {
            no: 5,
            instansi: "PT. Inovasi Digital",
            lowongan: "Quality Assurance",
            tipe: "Internship",
            tanggal: "2022-05-01",
            batas: "2022-05-07",
            penutup: "2022-05-14",
            status: "tidak publish",
        },
    ];

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
    const { data, error, isLoading } = useGetLowonganDisnaker(currentPage, search);
    // INTEGRASI


    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3 items-center">
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
                    className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
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