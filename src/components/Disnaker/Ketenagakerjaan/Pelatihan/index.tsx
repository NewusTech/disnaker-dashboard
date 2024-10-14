import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import { CustomSelect } from "@/components/SelectCustom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeletePopupTitik from "@/components/AksiPopup";

interface DataTableProps {
    headers: string[];
    data: Array<{
        no: number;
        namaInstansi: string;
        judulPelatihan: string;
        tanggalMulai: string;
        tanggalSelesai: string;
        kategori: string;
        kuotaPeserta: string;
    }>;
}

interface Company {
    id: number;
    name: string;
}

interface VacancyCategory {
    id: number;
    name: string;
}

interface Training {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    linkModule: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: Company;
    VacancyCategory: VacancyCategory;
}
interface TrainingResponse {
    data: Training[];
    headers: string[];
    currentPage: number;
    search: string;
    status: string;
}


const DataTable: React.FC<TrainingResponse> = ({ headers, data, currentPage, search, status }) => {

    return (
        <div className="Table mt-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell className="" >{user.Company.name ?? "-"}</TableCell>
                                <TableCell className="text-center" >{user.title ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.VacancyCategory.name ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.startDate ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.endDate ?? "-"}</TableCell>
                                <TableCell className="text-center">{user.quota ?? "-"}</TableCell>

                                {/*  */}
                                <TableCell className="text-center justify-center flex gap-2">
                                    <div className="aksi">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="flex items-center h-[20px] gap-1 cursor-pointer">
                                                    <div className="w-[5px] h-[5px] rounded-full bg-[#3D3D3D]"></div>
                                                    <div className="w-[5px] h-[5px] rounded-full bg-[#3D3D3D]"></div>
                                                    <div className="w-[5px] h-[5px] rounded-full bg-[#3D3D3D]"></div>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-fit mr-8 mt-1 bg-white">
                                                <DropdownMenuLabel className="font-semibold text-primary text-sm w-full shadow-md">
                                                    Pilih Aksi
                                                </DropdownMenuLabel>
                                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Link className="w-full" href={`/layanan-ketenagakerjaan/pelatihan/detail`}>
                                                            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                                Detail
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Link className="w-full" href={`/layanan-ketenagakerjaan/pelatihan/edit`}>
                                                            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                                Edit
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <DeletePopupTitik onDelete={async () => Promise.resolve()} />
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                                {/*  */}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
