"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Link from 'next/link';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import BreadPelamarIcon from '../../../../../../public/assets/icons/BreadPelamarIcon';
import DataTable from '@/components/perusahaan/pelamar/PelamarDiundang';

const DiundangPage = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Pelamar', logo: <BreadPelamarIcon /> },
    { label: 'Pelamar Diundang' },  // No logo 
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
    { label: "Pending", value: "Pending" },
    { label: "Diterima", value: "Diterima" },
    { label: "Ditolak", value: "Ditolak" },
  ];
  // select

  // Dummy data
  const dummyData = [
    {
      no: 1,
      posisi: "UI/UX Designer",
      nama: "John Doe",
      email: "john.doe@example.com",
      nomorTelepon: "081234567890",
      tanggalDilamar: "2022-01-02",
      status: "Pending",
    },
    {
      no: 2,
      posisi: "Backend Developer",
      nama: "Jane Smith",
      email: "jane.smith@example.com",
      nomorTelepon: "081234567891",
      tanggalDilamar: "2022-02-03",
      status: "Diterima",
    },
    {
      no: 3,
      posisi: "Frontend Developer",
      nama: "Tom Brown",
      email: "tom.brown@example.com",
      nomorTelepon: "081234567892",
      tanggalDilamar: "2022-03-04",
      status: "Ditolak",
    },
    {
      no: 4,
      posisi: "Project Manager",
      nama: "Lisa White",
      email: "lisa.white@example.com",
      nomorTelepon: "081234567893",
      tanggalDilamar: "2022-04-05",
      status: "Diterima",
    },
    {
      no: 5,
      posisi: "Quality Assurance",
      nama: "Mike Green",
      email: "mike.green@example.com",
      nomorTelepon: "081234567894",
      tanggalDilamar: "2022-05-06",
      status: "Pending",
    },
  ];

  // Define table headers
  const tableHeaders = ["No", "Posisi", "Nama", "Email", "Nomer Telepon", "Tanggal Dilamar", "Status", "Aksi"];
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