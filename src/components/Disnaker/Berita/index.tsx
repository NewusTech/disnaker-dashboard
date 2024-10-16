import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeletePopupTitik from "@/components/AksiPopup";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert } from "@/lib/swalAlert";
import { mutate } from "swr";
import Image from "next/image";

interface KategoriArtikel {
    id: number;
    title: string;
}

interface Artikel {
    id: number;
    title: string;
    slug: string;
    desc: string;
    image: string;
    kategori_id: number;
    createdAt: string;
    updatedAt: string;
    Kategoriartikel: KategoriArtikel;
}


interface ArtikelResponse {
    data: Artikel[];
    headers: string[];
    currentPage: number;
    search: string;
    status: string;
}


const DataTable: React.FC<ArtikelResponse> = ({ headers, data, currentPage, search, status }) => {
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();
    const handleDelete = async (slug: string) => {
        try {
            await axiosPrivate.delete(`/artikel/delete/${slug}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // alert
            showAlert('success', 'Data berhasil dihapus!');

            // alert
            // Update the local data after successful deletion
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menghapus data!';
            showAlert('error', errorMessage);
            //   alert
        } mutate(`/artikel/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);;
    };

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
                            <TableRow key={user?.id}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell className="text-start">
                                    {user?.createdAt ? new Date(user?.createdAt).toISOString().split('T')[0] : '-'}
                                </TableCell>
                                <TableCell className="text-start">{user?.title ?? "-"}</TableCell>
                                <TableCell className="text-center ">
                                    <div className="w-[250px] m-auto h-[170px]">
                                        <Image
                                            src={user?.image ?? "-"}
                                            alt="logo"
                                            width={400}
                                            height={400}
                                            unoptimized
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                {/*  */}
                                <TableCell className="text-center justify-center items-center flex gap-2 h-[170px]">
                                    <div className="aksi flex-shrink-0">
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
                                                        <Link className="w-full" href={`/berita/edit/${user?.slug}`}>
                                                            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                                Edit
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <DeletePopupTitik onDelete={() => handleDelete(user?.slug)} />
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
                            <TableCell colSpan={5} className="text-center">Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
