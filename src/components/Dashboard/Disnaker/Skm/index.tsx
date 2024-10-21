"use client";
import React, { useState } from "react";
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import PaginationTable from '@/components/PaginationTable';
import Unduh1icon from '../../../../../public/assets/icons/Unduh1icon';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Disnaker/IndeksKepuasan';

const Skm = () => {
    // State untuk menyimpan nilai yang dipilih
    const [selectedFilter, setSelectedFilter] = useState<string>("Bulan");

    // Data dummy untuk pertanyaan
    const dummyData = [
        { question: "Pertanyaan 1", percentage: 70, rating: "Baik" },
        { question: "Pertanyaan 2", percentage: 85, rating: "Sangat Baik" },
        { question: "Pertanyaan 3", percentage: 50, rating: "Cukup" },
        { question: "Pertanyaan 4", percentage: 30, rating: "Kurang" },
        { question: "Pertanyaan 5", percentage: 90, rating: "Sangat Baik" },
    ];

    // Fungsi untuk mendapatkan warna latar berdasarkan rating
    const getBackgroundColor = (rating: string) => {
        switch (rating) {
            case "Sangat Baik":
                return "bg-green-500"; // Hijau
            case "Baik":
                return "bg-yellow-500"; // Kuning
            case "Cukup":
                return "bg-orange-500"; // Oranye
            case "Kurang":
                return "bg-red-500"; // Merah
            default:
                return "bg-gray-500"; // Warna fallback default
        }
    };

    // Fungsi untuk menangani klik tombol filter
    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
    };

    // TABEL
    // Dummy data
    const dummyDataSKM = [
        {
            no: 1,
            nama: "John Doe",
            tanggal: "23 Desember 2023",
            nik: "123456789",
            email: "john@mail.com",
        },
        {
            no: 2,
            nama: "Jane Smith",
            tanggal: "15 Januari 2024",
            nik: "987654321",
            email: "jane@mail.com",
        },
        {
            no: 3,
            nama: "Ahmad Santoso",
            tanggal: "10 Februari 2024",
            nik: "123123123",
            email: "ahmad@mail.com",
        },
        {
            no: 4,
            nama: "Linda Hartono",
            tanggal: "5 Maret 2024",
            nik: "321321321",
            email: "linda@mail.com",
        },
        {
            no: 5,
            nama: "Rudi Pratama",
            tanggal: "20 April 2024",
            nik: "456456456",
            email: "rudi@mail.com",
        },
    ];


    // 
    // Define table headers
    const tableHeaders = ["No", "Nama", "Tanggal", "NIK", "Email", "Aksi"];
    // pagination
    const [currentPage, setCurrentPage] = useState(3);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };
    // pagination
    // TABEL

    return (
        <div>
            <div className="my-6 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                <div className="head flex items-center justify-between">
                    <div className="font-medium">Total Hasil Data Indeks Kepuasan</div>
                    <div className="text-base md:text-lg flex gap-2 bg-[#EEEEEE] w-fit p-2 rounded-full">
                        {["Bulan", "Tahun"].map((filter) => (
                            <button
                                key={filter}
                                className={`text-sm ${selectedFilter === filter
                                    ? "aktif text-white bg-primary p-2 rounded-full w-[100px]"
                                    : "w-[100px] text-black/70"
                                    }`}
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Kartu untuk setiap pertanyaan */}
                {dummyData.map((data, index) => (
                    <div key={index} className="card pertanyaan flex flex-col gap-2 mt-4">
                        <div>{data.question}</div>
                        <div className="wrap flex items-center gap-8">
                            <div className="bar relative h-[8px] rounded-full w-full bg-[#D9D9D9]">
                                <div className="absolute right-0 bottom-3 font-medium text-sm">
                                    {data.percentage}%
                                </div>
                                {/* Bar persentase dengan gaya inline untuk lebar dinamis */}
                                <div
                                    className="bar-persentase h-[8px] rounded-full bg-primary"
                                    style={{ width: `${data.percentage}%` }}
                                ></div>
                            </div>
                            {/* Rating dengan warna latar dinamis berdasarkan rating */}
                            <div
                                className={`px-5 py-2.5 rounded-full flex-shrink-0 w-[150px] text-center text-white ${getBackgroundColor(
                                    data.rating
                                )}`}
                            >
                                {data.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/*  */}
            <div className="my-6 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
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
                    <Button className='flex gap-3 items-center px-10'>
                        <Unduh1icon />
                        Unduh PDF
                    </Button>
                </div>
                {/* table */}
                <div className="Table mt-5">
                    <DataTable
                        headers={tableHeaders}
                        data={dummyDataSKM}
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
        </div>
    );
};

export default Skm;
