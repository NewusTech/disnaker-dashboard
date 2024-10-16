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
import Loading from "@/components/ui/Loading";
import Swal from "sweetalert2";
import useLocalStorage from "@/hooks/useLocalStorage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert } from "@/lib/swalAlert";
import { mutate } from "swr";

interface UserProfile {
    id: number;
    name: string;
    phoneNumber: string;
}

interface User {
    id: number;
    email: string;
    isActive: string;
    slug: string;
    UserProfile: UserProfile;
}

interface Company {
    id: number;
    name: string;
}

interface Vacancy {
    id: number;
    title: string;
    Company: Company;
}

interface Application {
    id: number;
    user_id: number;
    vacancy_id: number;
    createdAt: string;
    status: string;
    updatedAt: string;
    User: User;
    Vacancy: Vacancy;
}

interface ApplicationResponse {
    headers: string[];
    currentPage: number;
    search: string;
    status: string;
    data: Application[];
}


const DataTable: React.FC<ApplicationResponse> = ({ headers, data, currentPage, search, status }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const statusOptions = [
        { label: "Dilamar", value: "Dilamar" },
        { label: "Wawancara", value: "Wawancara" },
        { label: "Tes", value: "Tes" },
        { label: "Diterima", value: "Diterima" },
        { label: "Ditolak", value: "Ditolak" },
    ];

    const handleOpenPopup = (user: Application) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setSelectedValue(undefined); // Reset selected value
    };

    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const handleStatus = async () => {
        if (!selectedUser) return;

        setIsLoading(true); // Start loading
        try {

            // Send the request to the server
            await axiosPrivate.put(`/application/update/${selectedUser.id}`, {
                status: selectedValue,
            });

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                text: 'Status telah diperbarui di sistem!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            console.log("Success to update vacancy status:");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status!';
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: errorMessage,
                showConfirmButton: true,
                customClass: {
                    confirmButton: "bg-primary" // Warna biru untuk tombol konfirmasi
                },
            });
            console.error("Failed to update vacancy status:", error);
        } finally {
            setIsLoading(false); // Stop loading
            handleClosePopup(); // Close the popup after operation
            mutate(`/application/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);
        }
    };

    const handleDelete = async (slug: string) => {
        try {
            await axiosPrivate.delete(`/application/delete/${slug}`, {
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
        } mutate(`/application/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);;
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
                                <TableCell>{user?.Vacancy.Company.name ?? "-"} {user?.id ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.Vacancy.title ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User.UserProfile.name ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User.email ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.User.UserProfile.phoneNumber ?? "-"}</TableCell>
                                <TableCell className="text-center">
                                    {user?.createdAt ? new Date(user?.createdAt).toISOString().split('T')[0] : '-'}
                                </TableCell>
                                <TableCell className={`text-center font-medium
                                ${user?.status === "Dilamar" ? "text-[#656565]" : ""}
                                ${user?.status === "Wawancara" ? "text-[#FC6736]" : ""}
                                ${user?.status === "Tes" ? "text-primary" : ""}
                                ${user?.status === "Diterima" ? "text-[#399918]" : ""}
                                ${user?.status === "Ditolak" ? "text-[#DF1212]" : ""}
                                `}>
                                    {user?.status === "Dilamar" ? "Dilamar" :
                                        user?.status === "Wawancara" ? "Wawancara" :
                                            user?.status === "Tes" ? "Test" :
                                                user?.status === "Diterima" ? "Diterima" :
                                                    user?.status === "Ditolak" ? "Ditolak" : "Status Tidak Diketahui"}
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
                                                    <DropdownMenuItem>
                                                        <button onClick={() => handleOpenPopup(user)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Ubah Status
                                                        </button>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <Link href={`/instansi-disnaker/lamaran-pekerjaan/detail/${user?.id}`}>
                                                            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                                Detail
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                                                    <DeletePopupTitik onDelete={() => handleDelete(user?.User?.slug)} />
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center">Tidak ada data</TableCell>
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
