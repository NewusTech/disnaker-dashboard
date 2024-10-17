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
import Loading from "@/components/ui/Loading";

interface YellowCardResponse {
    data: YellowCard[];
    headers: string[];
    currentPage: number;
    search: string;
    status: string;
}

interface YellowCard {
    id: number;
    user_id: number;
    residance: string;
    submissionNumber: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    educationLevel_id: number;
    job: string;
    skill: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    User: User;
}

interface User {
    id: number;
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
    image: string;
    kk: string;
    ktp: string;
    employmentStatus: string;
    maritalStatus: string;
    citizenship: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}


const DataTable: React.FC<YellowCardResponse> = ({ headers, data, currentPage, search, status }) => {

    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();
    const handleDelete = async (id: number) => {
        try {
            await axiosPrivate.delete(`/yellowcard/delete/${id}`, {
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
        } mutate(`/yellowcard/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Loading state


    const statusOptions = [
        { label: "Proses", value: "Proses" },
        { label: "Terbit", value: "Terbit" },
        { label: "Ditolak", value: "Ditolak" },
    ];

    const handleOpenPopup = (user: YellowCard) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setSelectedValue(undefined); // Reset selected value
    };

    const handleStatus = async () => {
        if (!selectedUser) return;

        setIsLoading(true); // Start loading
        try {
            // Send the request to the server
            await axiosPrivate.put(`/yellowcard/update/${selectedUser.id}`, {
                status: selectedValue,
            });
            showAlert('success', 'Status berhasil diperbarui!');
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal memperbarui status!';
            showAlert('error', errorMessage);
            //   alert
        } finally {
            setIsLoading(false); // Stop loading
            handleClosePopup(); // Close the popup after operation
            mutate(`/yellowcard/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);
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
                                <TableCell className="text-center" >{user?.submissionNumber ?? "-"}</TableCell>
                                <TableCell className="text-center" >{user?.User?.UserProfile?.name ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User?.UserProfile?.nik ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.createdAt ? new Date(user?.createdAt).toISOString().split('T')[0] : '-'}</TableCell>
                                <TableCell className={`text-center font-medium
                                ${user?.status === "Pengajuan" ? "text-[#6E6E6E]" : ""}
                                ${user?.status === "Terbit" ? "text-[#399918]" : ""}
                                ${user?.status === "Proses" ? "text-[#FC6736]" : ""}
                                ${user?.status === "Ditolak" ? "text-[#DF1212]" : ""}
                                `}>
                                    {user?.status === "Pengajuan" ? "Pengajuan" :
                                        user?.status === "Terbit" ? "Terbit" :
                                            user?.status === "Proses" ? "Proses" :
                                                user?.status === "Ditolak" ? "Ditolak" : "Status Tidak Diketahui"}
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
                                                        <button onClick={() => handleOpenPopup(user)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Ubah Status
                                                        </button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Link className="w-full" href={`/pelayanan/kartu-kuning/detail/${user?.id}`}>
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

            {/* Popup for updating the status */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleClosePopup} // Close popup on overlay click
                >
                    <div
                        className="bg-white p-4 rounded-lg relative max-w-[500px] mx-3 md:mx-0 w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                        >
                            &times;
                        </button>
                        <div>
                            <h2 className="font-semibold mb-5">Ubah Status</h2>
                            <CustomSelect
                                value={selectedValue}
                                options={statusOptions}
                                onChange={setSelectedValue}
                                placeholder="Pilih status"
                                label="Status Lowongan"
                                width="w-full"
                            />
                            <div className="flex justify-end mt-5">
                                <Button
                                    onClick={handleStatus}
                                    className="py-2 bg-primary text-white rounded-full w-[170px]"
                                    disabled={isLoading || !selectedValue} // Disable button if loading or no selection
                                >
                                    {isLoading ? <Loading /> : <span className="text-sm">Perbarui status</span>} {/* Button text changes based on loading state */}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
