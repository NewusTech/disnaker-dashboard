"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import BreadMasyarakat from '../../../../../public/assets/icons/MasyarakatBread';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/admin/Transmigrasi';

const TransmigrasiPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Masyarakat', logo: <BreadMasyarakat /> },
    { label: 'Transmigrasi' },  // No logo 
  ];

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "Permohonan Baru", value: "permohonan baru" },
    { label: "Proses", value: "proses" },
    { label: "Bisa Diambil", value: "bisa diambil" },
    { label: "Sudah Diambil", value: "sudah diambil" },
    { label: "Ditolak", value: "ditolak" },
  ];
  // select

  // Dummy data
  const dummyData = [
    {
      no: 1,
      nama: "John Doe",
      nik: "123456789",
      noPengajuan: "123456789",
      tanggal: "23-02-2000",
      status: "permohonan baru",
    },
    {
      no: 2,
      nama: "Jane Smith",
      nik: "987654321",
      noPengajuan: "123456789",
      tanggal: "23-02-2000",
      status: "proses",
    },
    {
      no: 3,
      nama: "Michael Johnson",
      nik: "456789123",
      noPengajuan: "123456789",
      tanggal: "23-02-2000",
      status: "bisa diambil",
    },
    {
      no: 4,
      nama: "Emily Davis",
      nik: "321654987",
      noPengajuan: "123456789",
      tanggal: "23-02-2000",
      status: "sudah diambil",
    },
    {
      no: 5,
      nama: "Chris Brown",
      nik: "159753468",
      noPengajuan: "123456789",
      tanggal: "23-02-2000",
      status: "ditolak",
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

export default TransmigrasiPage