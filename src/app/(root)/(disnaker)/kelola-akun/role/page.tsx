"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import BreadKelola from '../../../../../../public/assets/icons/BreadKelola';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import Link from 'next/link';
import DataTable from '@/components/Disnaker/KelolaAkun/Role';
import { useGetRole } from '@/api';

const Role = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Kelola Akun', logo: <BreadKelola /> },
    { label: 'Admin' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const roleOptions = [
    { label: "Semua", value: "semua" },
    { label: "Super Admin", value: "Super Admin" },
    { label: "Kepala Dinas", value: "Kepala Dinas" },
  ];
  // select

  const dummyData = [
    {
      no: 1,
      role: "Super Admin",
    },
    {
      no: 2,
      role: "Kepala Dinas",
    },
    {
      no: 3,
      role: "Kepala Bidang Pelatihan",
    },
    {
      no: 4,
      role: "Staff Administrasi",
    },
    {
      no: 5,
      role: "Pengawas Ketenagakerjaan",
    },
  ];



  // Define table headers
  const tableHeaders = ["No", "Role", "Aksi"];

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
  const { data } = useGetRole(currentPage, search);
  // INTEGRASI


  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-3 flex gap-5 items-center">
        <Input
          placeholder='Pencarian'
          leftIcon={<SearchIcon />}
          value={search}
          onChange={handleSearchChange}
        />
        <Link
          href="/kelola-akun/role/tambah"
          className="flex flex-shrink-0 gap-2 items-center px-7 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
          <Tambah />
          Tambah Role
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

export default Role