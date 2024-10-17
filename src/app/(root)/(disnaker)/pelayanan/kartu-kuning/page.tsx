"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/admin/KartuKuning';
import Unduh1icon from '../../../../../../public/assets/icons/Unduh1icon';
import { Button } from '@/components/ui/button';
import BreadPelayanan from '../../../../../../public/assets/icons/BreadPelayanan';
import { useGetKartuKuning } from '@/api';

const KartuKuning = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Pelayanan', logo: <BreadPelayanan /> },
    { label: 'Kartu Kuning' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "Pengajuan", value: "pengajuan" },
    { label: "Proses", value: "proses" },
    { label: "Terbit", value: "terbit" },
    { label: "Ditolak", value: "ditolak" },
  ];
  // select

  // Dummy data
  const dummyData = [
    {
      no: 1,
      nama: "John Doe",
      nik: "123456789",
      noPengajuan: "32425365",
      tanggal: "23 Desember 2023",
      status: "pengajuan",
    },
    {
      no: 2,
      nama: "Jane Smith",
      nik: "987654321",
      noPengajuan: "32425365",
      tanggal: "24 Desember 2023",
      status: "terbit",
    },
    {
      no: 3,
      nama: "Michael Johnson",
      nik: "456789123",
      noPengajuan: "32425365",
      tanggal: "25 Desember 2023",
      status: "proses",
    },
    {
      no: 4,
      nama: "Emily Davis",
      nik: "321654987",
      noPengajuan: "32425365",
      tanggal: "26 Desember 2023",
      status: "ditolak",
    },
    {
      no: 5,
      nama: "Chris Brown",
      nik: "159753468",
      noPengajuan: "32425365",
      tanggal: "27 Desember 2023",
      status: "pengajuan",
    },
  ];

  // 
  // Define table headers
  const tableHeaders = ["No", "No Pengajuan", "Nama", "NIK", "Tanggal Dibuat", "Status", "Aksi"];

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
  const { data } = useGetKartuKuning(currentPage, search, status);
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

export default KartuKuning