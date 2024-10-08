"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import BreadMasyarakat from '../../../../../../public/assets/icons/MasyarakatBread';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/admin/KartuKuning';

const KartuKuning = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Masyarakat', logo: <BreadMasyarakat /> },
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
      noPengajuan: "john@example.com",
      tanggal: "23 Desember 2023",
      status: "pengajuan",
    },
    {
      no: 2,
      nama: "Jane Smith",
      nik: "987654321",
      noPengajuan: "jane@example.com",
      tanggal: "24 Desember 2023",
      status: "terbit",
    },
    {
      no: 3,
      nama: "Michael Johnson",
      nik: "456789123",
      noPengajuan: "michael@example.com",
      tanggal: "25 Desember 2023",
      status: "proses",
    },
    {
      no: 4,
      nama: "Emily Davis",
      nik: "321654987",
      noPengajuan: "emily@example.com",
      tanggal: "26 Desember 2023",
      status: "ditolak",
    },
    {
      no: 5,
      nama: "Chris Brown",
      nik: "159753468",
      noPengajuan: "chris@example.com",
      tanggal: "27 Desember 2023",
      status: "pengajuan",
    },
  ];

  // 
  // Define table headers
  const tableHeaders = ["No", "Nama", "NIK", "No Pengajuan", "Tanggal Dibuat", "Status", "Aksi"];
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

export default KartuKuning