"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import BreadPerusahaan from '../../../../../../public/assets/icons/BreadPerusahaan';
import DataTable from '@/components/Disnaker/Instansi/Lamaran';
import { useGetLamaranDisnaker } from '@/api';

const LamaranPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Instansi', logo: <BreadPerusahaan /> },
    { label: 'Lamaran Pekerjaan' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "UI/UX", value: "UI/UX" },
    { label: "Frontend", value: "Frontend" },
  ];
  // select
  // select
  const [selectedValueLamaran, setSelectedValueLamaran] = useState<string | undefined>(undefined);
  const lamaranOptions = [
    { label: "Semua", value: "semua" },
    { label: "Telah Dilamar", value: "Telah Dilamar" },
    { label: "Wawancara", value: "Wawancara" },
    { label: "Test", value: "Test" },
    { label: "Diterima", value: "Diterima" },
    { label: "Ditolak", value: "Ditolak" },
  ];
  // select


  // Define table headers
  const tableHeaders = ["No", "Nama Instansi", "Posisi", "Nama", "Email", "Nomer Telepon", "Tanggal Dilamar", "Status", "Aksi"];

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
  const { data } = useGetLamaranDisnaker(currentPage, search, status);
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
          label="Status Posisi"
          options={statusOptions}
          placeholder="Status Posisi"
          value={selectedValue}
          onChange={setSelectedValue}
          width="w-full"
        />
        <CustomSelect
          label="Status Lamaran"
          options={lamaranOptions}
          placeholder="Status Lamaran"
          value={selectedValueLamaran}
          onChange={setSelectedValue}
          width="w-full"
        />
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

export default LamaranPage