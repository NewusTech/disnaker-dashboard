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

interface DataTableProps {
    headers: string[];
    data: Array<{
        no: number;
        nama: string;
        nik: string;
        noPengajuan: string;
        tanggal: string;
        status: string;
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
                            <TableCell>{user.nama}</TableCell>
                            <TableCell className="text-center">{user.nik}</TableCell>
                            <TableCell className="text-center">{user.noPengajuan}</TableCell>
                            <TableCell className="text-center">{user.tanggal}</TableCell>
                            <TableCell className={`text-center font-medium
                                ${user.status === "pengajuan" ? "text-[#6E6E6E]" : ""}
                                ${user.status === "terbit" ? "text-[#399918]" : ""}
                                ${user.status === "proses" ? "text-[#FC6736]" : ""}
                                ${user.status === "ditolak" ? "text-[#DF1212]" : ""}
                                `}>
                                {user.status === "pengajuan" ? "Pengajuan" :
                                    user.status === "terbit" ? "Terbit" :
                                        user.status === "proses" ? "Proses" :
                                            user.status === "ditolak" ? "Ditolak" : "Status Tidak Diketahui"}
                            </TableCell>

                            <TableCell className="text-center flex gap-2">
                                <button onClick={() => handleOpenPopup(user)} className="p-2 w-[120px] bg-primary text-white rounded-full">
                                    Ubah Status
                                </button>
                                <Link href="/masyarakat/kartu-kuning/detail" className="p-2 w-[120px] bg-[#3D3D3D]/20 text-[#3D3D3D] rounded-full">
                                    Detail
                                </Link>
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
