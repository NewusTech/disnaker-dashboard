"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Link from 'next/link';
import Tambah from '../../../../public/assets/icons/Tambah';
import BreadLaporan from '../../../../public/assets/icons/BreadLaporan';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/perusahaan/laporan';
import PrintIcon from '../../../../public/assets/icons/PrintIcon';

const DiundangPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Laporan', logo: <BreadLaporan /> },
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

  // dummy data
  const dummyData = [
    {
      no: 1,
      lowongan: "Programmer",
      kategori: "IT",
      telahDilamar: 20,
      wawancara: 20,
      test: 20,
      diterima: 20,
      ditolak: 20,
      totalPelamar: 100
    },
    {
      no: 2,
      lowongan: "Graphic Designer",
      kategori: "Design",
      telahDilamar: 15,
      wawancara: 10,
      test: 8,
      diterima: 5,
      ditolak: 10,
      totalPelamar: 48
    },
    {
      no: 3,
      lowongan: "Data Analyst",
      kategori: "Data",
      telahDilamar: 30,
      wawancara: 25,
      test: 20,
      diterima: 18,
      ditolak: 12,
      totalPelamar: 105
    },
    {
      no: 4,
      lowongan: "Marketing Manager",
      kategori: "Marketing",
      telahDilamar: 12,
      wawancara: 8,
      test: 6,
      diterima: 4,
      ditolak: 8,
      totalPelamar: 38
    },
    {
      no: 5,
      lowongan: "Product Manager",
      kategori: "Management",
      telahDilamar: 22,
      wawancara: 18,
      test: 15,
      diterima: 10,
      ditolak: 12,
      totalPelamar: 77
    }
  ];
  

  // Define table headers
  const tableHeaders = ["No", "Lowongan", "Kategori", "Telah Dilamar", "Wawancara", "Test", "Diterima", "Ditolak", "Total Pelamar"];
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
          label="Status Posisi"
          options={kategoriOptions}
          placeholder="Status Posisi"
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

export default DiundangPage