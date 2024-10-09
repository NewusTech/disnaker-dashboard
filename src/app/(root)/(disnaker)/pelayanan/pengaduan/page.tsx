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

  // Dummy data
  const dummyData = [
    {
      no: 1,
      nama: "John Doe",
      nik: "123456789",
      judul: "Website Lama",
      tanggal: "23 Desember 2023",
      status: "proses",
    },
    {
      no: 2,
      nama: "Jane Smith",
      nik: "987654321",
      judul: "Website Lama",
      tanggal: "24 Desember 2023",
      status: "diterima",
    },
    {
      no: 3,
      nama: "Michael Johnson",
      nik: "456789123",
      judul: "Website Lama",
      tanggal: "25 Desember 2023",
      status: "ditolak",
    },
    {
      no: 4,
      nama: "Emily Davis",
      nik: "321654987",
      judul: "Website Lama",
      tanggal: "26 Desember 2023",
      status: "diterima",
    },
    {
      no: 5,
      nama: "Chris Brown",
      nik: "159753468",
      judul: "Website Lama",
      tanggal: "27 Desember 2023",
      status: "ditolak",
    },
  ];

  // 
  // Define table headers
  const tableHeaders = ["No", "Nama", "NIK", "Judul", "Tanggal Dibuat", "Status", "Aksi"];
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

export default PengaduanPage