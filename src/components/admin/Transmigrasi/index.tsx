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
import useLocalStorage from "@/hooks/useLocalStorage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert } from "@/lib/swalAlert";
import { mutate } from "swr";

interface TransmigrationResponse {
    data: TransmigrationDetail[];
    headers: string[];
    currentPage: number;
    search: string;
    status: string;
}

interface TransmigrationDetail {
    id: number;
    user_id: number;
    submissionNumber: string;
    domicile: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    status: string;
    kk: string;
    createdAt: string;
    updatedAt: string;
    User: User;
}

interface User {
    id: number;
    email: string;
    UserProfile: UserProfile;
}

interface UserProfile {
    id: number;
    user_id: number;
    name: string;
    nik: string;
    birthDate: string;
    slug: string;
    department: string;
    gender: string;
    address: string;
    phoneNumber: string;
    about: string;
    cv: string;
    portfolio: string;
    birthPlace: string;
    religion: string;
    location: string | null;
    profession: string;
    image: string | null;
    provinsi: string | null;
    kabupaten: string | null;
    kecamatan: string | null;
    kelurahan: string | null;
    kk: string | null;
    ktp: string | null;
    employmentStatus: string;
    maritalStatus: string;
    citizenship: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}
const DataTable: React.FC<TransmigrationResponse> = ({ headers, data, currentPage, search, status }) => {

    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();
    const handleDelete = async (id: number) => {
        try {
            await axiosPrivate.delete(`/transmigration/delete/${id}`, {
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
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal menghapus data!';
            showAlert('error', errorMessage);
            //   alert
        } mutate(`/transmigration/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const statusOptions = [
        { label: "Pengajuan", value: "Pengajuan" },
        { label: "Proses", value: "proses" },
        { label: "Terbit", value: "Terbit" },
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
                    {data?.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow key={user?.id}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell className="text-center">{user?.submissionNumber ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User?.UserProfile?.name ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User.UserProfile?.nik ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.createdAt ? new Date(user?.createdAt).toISOString().split('T')[0] : '-'}</TableCell>
                                <TableCell className={`text-center font-medium
                                ${user.status === "Pengajuan" ? "text-[#6E6E6E]" : ""}
                                ${user.status === "proses" ? "text-[#FC6736]" : ""}
                                ${user.status === "Terbit" ? "text-[#399918]" : ""}
                                ${user.status === "ditolak" ? "text-[#DF1212]" : ""}
                                `}>
                                    {user.status === "Pengajuan" ? "Pengajuan" :
                                        user.status === "proses" ? "Proses" :
                                            user.status === "Terbit" ? "Terbit" :
                                                user.status === "ditolak" ? "Ditolak" : "Status Tidak Diketahui"}
                                </TableCell>

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
                                                        <button onClick={() => handleOpenPopup(user)} >
                                                            Ubah Status
                                                        </button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Link className="w-full" href={`/pelayanan/transmigrasi/detail`}>
                                                            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                                Detail
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <DeletePopupTitik onDelete={() => handleDelete(user?.id)} />
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
                            <TableCell colSpan={7} className="text-center">Tidak ada data</TableCell>
                        </TableRow>
                    )}
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
