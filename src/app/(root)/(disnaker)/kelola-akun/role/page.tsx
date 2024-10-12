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
  // pagination
  const [currentPage, setCurrentPage] = useState(3);
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  };
  // pagination


  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-3 flex gap-3 items-center">
        <Input
          placeholder='Pencarian'
          leftIcon={<SearchIcon />}
        />
        <CustomSelect
          label="Role"
          options={roleOptions}
          placeholder="Role"
          value={selectedValue}
          onChange={setSelectedValue}
          width="w-full"
        />
        <Link
          href="/kelola-akun/role/tambah"
          className="flex flex-shrink-0 gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
          <Tambah />
          Tambah Role
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

export default Role