"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import DataTable from '@/components/admin/Pengaduan';
import { Button } from '@/components/ui/button';
import { useGetPengaduan } from '@/api';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import SearchIcon from "../../../../../public/assets/icons/SearchIcon";
import Unduh1icon from "../../../../../public/assets/icons/Unduh1icon";
export const description = "A line chart with dots"
const chartData = [
  { month: "January", pengaduan: 186 },
  { month: "February", pengaduan: 305 },
  { month: "March", pengaduan: 237 },
  { month: "April", pengaduan: 73 },
  { month: "May", pengaduan: 209 },
  { month: "June", pengaduan: 214 },
  { month: "July", pengaduan: 190 },
  { month: "August", pengaduan: 225 },
  { month: "September", pengaduan: 250 },
  { month: "October", pengaduan: 300 },
  { month: "November", pengaduan: 175 },
  { month: "December", pengaduan: 260 }
];

const chartConfig = {
  pengaduan: {
    label: "Pengaduan",
    color: "#FC6736",
  },
} satisfies ChartConfig

const Skm = () => {

  // select
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const statusOptions = [
    { label: "Semua", value: "semua" },
    { label: "Proses", value: "proses" },
    { label: "Diterima", value: "diterima" },
    { label: "Ditutup", value: "ditutup" },
  ];
  // select


  // 
  // Define table headers
  const tableHeaders = ["No", "Nama", "NIK", "Judul", "Tanggal Dibuat", "Status", "Aksi"];

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
  const { data } = useGetPengaduan(currentPage, search, status);
  // INTEGRASI

  return (
    <div>
      <div className="my-6 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
        <div className="head flex items-center justify-between">
          <div className="font-semibold">Perkembangan Pengaduan Berdasarkan Waktu</div>
          <div className="">
            <Select>
              <SelectTrigger className="w-[100px] rounded-full bg-primary text-white">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* chart */}
        <div className="my-6">
          <Card>
            <CardContent>
              <ChartContainer className="h-[400px] w-full" config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel className="bg-white" />}
                  />
                  <Line
                    dataKey="pengaduan"
                    type="natural"
                    stroke="var(--color-pengaduan)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-pengaduan)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        {/* chart */}
      </div>
      {/* tabel */}
      <div className="my-6 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
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
        <div className="Table mt-4">
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
      {/* tabel */}
    </div>
  );
};

export default Skm;
