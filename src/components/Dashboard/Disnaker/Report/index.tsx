import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import Image from 'next/image';
const BarChart = dynamic(() => import('@/components/Dashboard/BarChart'), { ssr: false });
import dynamic from 'next/dynamic';
import Garis from '@/components/ui/garis';
import { PendidikanChart } from '../../PendidikanChart';
import { PosisiChart } from '../../PosisiChart';
import Link from 'next/link';
import { useGetKartuKuningDash, useGetTransmigrasiDash } from '@/api';
import PaginationTable from '@/components/PaginationTable';
import DataTableKartu from './kartuKuning';
import DataTableTrans from './Transmigrasi';


const Report = () => {
    // State untuk menyimpan nilai yang dipilih
    const [selectedFilter, setSelectedFilter] = useState<string>('Hari');

    // date
    const formatDateToDDMMYYYY = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero if needed
        const year = date.getFullYear(); // Get full year

        return `${day}/${month}/${year}`; // Return formatted date
    };

    // Fungsi untuk menangani klik tombol
    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
    };

    // TABLE
    // KARTU KUNING
    // Define table headers
    const tableHeadersKartu = ["No", "No Pengajuan", "Nama", "Tanggal Dibuat", "Status",];
    // Pagination state
    const [currentPageKartu, setCurrentPageKartu] = useState(1);
    const onPageChangeKartu = (page: number) => {
        setCurrentPageKartu(page)
    };
    const { data: dataKartu } = useGetKartuKuningDash(currentPageKartu);
    // TRANSMIGRASI
    // Define table headers
    const tableHeaders = ["No", "No Pengajuan", "Nama", "Tanggal Dibuat", "Status",];
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };
    const { data: data } = useGetTransmigrasiDash(currentPage);
    // TABLE

    return (
        <div>
            {/* Filter */}
            <div className="filter justify-end flex items-center gap-3 my-6">
                <div className="date flex items-center gap-3">
                    <Input
                        type='date'
                        placeholder='Tanggal Awal'
                    />
                    <div className="">to</div>
                    <Input
                        type='date'
                        placeholder='Tanggal Akhir'
                    />
                </div>
                <div className="text-base md:text-lg flex gap-2 bg-[#EEEEEE] w-fit p-2  rounded-full">
                    {['Hari', 'Bulan', 'Tahun'].map((filter) => (
                        <button
                            key={filter}
                            className={`text-sm ${selectedFilter === filter ? 'aktif text-white bg-primary p-2 rounded-full w-[100px]' : 'w-[100px] text-black/70'}`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* filter */}
            {/*  */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
                <div className="flex bg-primary p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/perusahaan.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="text-white">JUMLAH TOTAL PERUSAHAAN</div>
                    </div>
                    <div className="total font-semibold text-3xl text-white">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border border-primary shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/pelamar.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="">JUMLAH TOTAL PELAMAR</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
            </div>
            {/* barchart */}
            <div className="barchart my-8 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                <div className="head">
                    <div className="text-center">Statistik Tenaga Kerja</div>
                    <div className="font-semibold text-center">Klasifikasi tenaga kerja pria dan wanita Kabupaten Tanggamus</div>
                    <Garis />
                </div>
                <BarChart />
            </div>
            {/* chart pie */}
            <div className="flex gap-4">
                <div className="left w-1/2 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="head">
                        <div className="">Statistik Tenaga Kerja</div>
                        <div className="font-semibold">Berdasarkan Pendidikan</div>
                        <Garis />
                        <PendidikanChart />
                    </div>
                </div>
                <div className="right w-1/2 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="head">
                        <div className="">Statistik Status Pekerjaan</div>
                        <div className="font-semibold">Berdasarkan Posisi</div>
                        <Garis />
                        <PosisiChart />
                    </div>
                </div>
            </div>
            {/* chart pie */}
            {/* kartu kuning/transmigrasi */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-6">
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/terbit.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="text-primary text-center">JUMLAH KARTU KUNING YANG TERBIT</div>
                    </div>
                    <div className="text-primary total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/tolak.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="text-error text-center">JUMLAH KARTU KUNING YANG DITOLAK</div>
                    </div>
                    <div className="text-error total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/terbit.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="text-primary text-center">JUMLAH TRANSMIGRASI YANG TERBIT</div>
                    </div>
                    <div className="text-primary total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/tolak.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="text-error text-center">JUMLAH TRANSMIGRASI YANG DITOLAK</div>
                    </div>
                    <div className="text-error total font-semibold text-3xl">65</div>
                </div>
            </div>
            {/* kartu kuning/transmigrasi */}
            {/* tabel */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
                {/* kartu kuning */}
                <div className="flex  p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="flex flex-col gap-4 items-end w-full">
                        <Link
                            href="/pelayanan/kartu-kuning"
                            className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                            Lihat Semua Data Kartu Kuning
                        </Link>
                    </div>
                    {/* table */}
                    <div className="Table w-full">
                        <DataTableKartu
                            headers={tableHeadersKartu}
                            data={dataKartu?.data}
                            currentPage={currentPageKartu}
                        />
                    </div>
                    {/* table */}
                    {/* pagination */}
                    <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                        <PaginationTable
                            currentPage={currentPageKartu}
                            totalPages={dataKartu?.pagination?.totalPages as number}
                            onPageChange={onPageChangeKartu}
                        />
                    </div>
                    {/* pagination */}
                </div>
                {/* transmigrasi */}
                <div className="flex  p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="flex flex-col gap-4 items-end w-full">
                        <Link
                            href="/pelayanan/transmigrasi"
                            className="flex flex-shrink-0 gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white">
                            Lihat Semua Data Transmigrasi
                        </Link>
                    </div>
                    {/* table */}
                    <div className="Table w-full">
                        <DataTableTrans
                            headers={tableHeaders}
                            data={data?.data}
                            currentPage={currentPage}
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
            </div>
            {/* tabel */}
        </div>
    )
}

export default Report