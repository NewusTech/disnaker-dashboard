"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import { Button } from '@/components/ui/button';
import PrintIcon from '../../../../../public/assets/icons/PrintIcon';
import DataTable from '@/components/Disnaker/Laporan';
import BreadLaporanDinas from '../../../../../public/assets/icons/BreadLaporanDinas';
import { useGetLaporanDisnaker } from '@/api';

const LaporanDinasPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Laporan Disnaker', logo: <BreadLaporanDinas /> },
    // { label: 'Pelamar Diundang' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const kategoriOptions = [
    { label: "Semua", value: "semua" },
    { label: "IT", value: "IT" },
    { label: "Kesehatan", value: "Kesehatan" },
    { label: "Pertanian", value: "Pertanian" },
  ];
  // select

  // Define table headers
  const tableHeaders = ["No", "Nama Instansi", "Lowongan", "Kategori", "Telah Dilamar", "Wawancara", "Test", "Diterima", "Ditolak", "Total Pelamar"];

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
  const { data } = useGetLaporanDisnaker(currentPage, search, status);
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
        <Button className='flex gap-2 items-center px-10'>
          <PrintIcon />
          Print
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

export default LaporanDinasPage