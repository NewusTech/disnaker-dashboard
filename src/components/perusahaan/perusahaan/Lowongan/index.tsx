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
        no: number,
        lowongan: string,
        tipe: string,
        tanggal: string,
        batas: string,
        penutup: string,
        status: string,
    }>;
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const statusOptions = [
        { label: "Pengajuan", value: "pengajuan" },
        { label: "Proses", value: "proses" },
        { label: "Terbit", value: "terbit" },
        { label: "Ditolak", value: "ditolak" },
    ];

    const handleOpenPopup = (user: any) => {
        setIsOpen(true);
        setSelectedUser(user); // Store the selected user
        setSelectedValue(user.status); // Set the current status for the select
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setSelectedFoto(null);
        setSelectedUser(null); // Clear selected user
        setSelectedValue(undefined); // Reset selected value
    };

    const handleStatus = () => {
        if (selectedUser) {
            // Here you can update the status in your data or make an API call
            console.log(`Updating status for user ${selectedUser.no} to ${selectedValue}`);
            // For example, you could update the local state or send a request to your API

            // Close the popup after updating
            handleClosePopup();
        }
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
                    {data.map((user) => (
                        <TableRow key={user.no}>
                            <TableCell className="text-center">{user.no}</TableCell>
                            <TableCell>{user.lowongan}</TableCell>
                            <TableCell className="text-center">{user.tipe}</TableCell>
                            <TableCell className="text-center">{user.tanggal}</TableCell>
                            <TableCell className="text-center">{user.batas}</TableCell>
                            <TableCell className="text-center">{user.penutup}</TableCell>
                            <TableCell className={`text-center font-medium
                                ${user.status === "publish" ? "text-[#399918]" : ""}
                                ${user.status === "tidak publish" ? "text-[#DF1212]" : ""}
                                `}>
                                {user.status === "publish" ? "Publish" :
                                    user.status === "tidak publish" ? "Tidak Publish" : "Status Tidak Diketahui"}
                            </TableCell>

                            <TableCell className="text-center justify-center flex gap-2">
                                <div className="aksi">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <div className="flex gap-1 cursor-pointer">
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
                                                    <Link href={`/perusahaan/lowongan-pekerjaan/detail`}>
                                                        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Detail
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                    <Link href={`/perusahaan/lowongan-pekerjaan/edit`}>
                                                        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Edit
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                                    <DeletePopupTitik onDelete={async () => Promise.resolve()} />
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
