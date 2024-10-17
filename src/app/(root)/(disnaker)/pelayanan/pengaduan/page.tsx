"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/admin/Pengaduan';
import { Button } from '@/components/ui/button';
import Unduh1icon from '../../../../../../public/assets/icons/Unduh1icon';
import BreadPelayanan from '../../../../../../public/assets/icons/BreadPelayanan';
import { useGetPengaduan } from '@/api';

const PengaduanPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Pelayanan', logo: <BreadPelayanan /> },
    { label: 'Pengaduan' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "Proses", value: "proses" },
    { label: "Diterima", value: "diterima" },
    { label: "Ditutup", value: "ditutup" },
  ];
  // select


  // 
  // Define table headers
  const tableHeaders = ["No", "Nama", "NIK", "Judul", "Tanggal Dibuat", "Status", "Aksi"];

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
  const { data } = useGetPengaduan(currentPage, search, status);
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
        <Input
          type='date'
          placeholder='Tanggal Awal'
        />
        <Input
          type='date'
          placeholder='Tanggal Akhir'
        />
        <CustomSelect
          label="Status Akun"
          options={statusOptions}
          placeholder="Status Akun"
          value={selectedValue}
          onChange={setSelectedValue}
          width="w-full"
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

export default PengaduanPage