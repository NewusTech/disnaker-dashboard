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
import { CustomSelect } from "@/components/SelectCustom";
import { Button } from "@/components/ui/button";

interface DataTableProps {
    headers: string[];
    data: Array<{
        no: number;
        instansi: string;
        posisi: string;
        nama: string;
        email: string;
        nomorTelepon: string;
        tanggalDilamar: string;
        status: string;
    }>;
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const statusOptions = [
        { label: "Telah Dilamar", value: "Telah Dilamar" },
        { label: "Wawancara", value: "Wawancara" },
        { label: "Test", value: "Test" },
        { label: "Diterima", value: "Diterima" },
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
                            <TableCell>{user.instansi}</TableCell>
                            <TableCell className="text-center">{user.posisi}</TableCell>
                            <TableCell className="text-center">{user.nama}</TableCell>
                            <TableCell className="text-center">{user.email}</TableCell>
                            <TableCell className="text-center">{user.nomorTelepon}</TableCell>
                            <TableCell className="text-center">{user.tanggalDilamar}</TableCell>
                            <TableCell className={`text-center font-medium
                                ${user.status === "Telah Dilamar" ? "text-[#656565]" : ""}
                                ${user.status === "Wawancara" ? "text-[#FC6736]" : ""}
                                ${user.status === "Test" ? "text-primary" : ""}
                                ${user.status === "Diterima" ? "text-[#399918]" : ""}
                                ${user.status === "Ditolak" ? "text-[#DF1212]" : ""}
                                `}>
                                {user.status === "Telah Dilamar" ? "Telah Dilamar" :
                                    user.status === "Wawancara" ? "Wawancara" :
                                        user.status === "Test" ? "Test" :
                                            user.status === "Diterima" ? "Diterima" :
                                                user.status === "Ditolak" ? "Ditolak" : "Status Tidak Diketahui"}
                            </TableCell>

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
                                                    <button onClick={() => handleOpenPopup(user.no)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                        Ubah Status
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                    <Link href={`/instansi-disnaker/lamaran-pekerjaan/detail`}>
                                                        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Detail
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
            {/* Popup for displaying the photo */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleClosePopup} // Close popup on overlay click
                >
                    <div
                        className="bg-white p-4 rounded-lg relative"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                        >
                            x
                        </button>
                        <div className="w-[500px]">
                            <div className="font-semibold mb-5">
                                Ubah Status Pengajuan
                            </div>
                            <div className="">
                                <CustomSelect
                                    label="Status Akun"
                                    options={statusOptions}
                                    placeholder="Status Akun"
                                    value={selectedValue}
                                    onChange={setSelectedValue}
                                    width="w-full"
                                />
                                <div className="flex justify-end mt-5">
                                    <Button onClick={handleStatus} className="py-2">
                                        Perbarui Status
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
