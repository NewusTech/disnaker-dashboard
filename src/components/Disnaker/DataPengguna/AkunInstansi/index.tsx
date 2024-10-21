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
import { CustomSelect } from "@/components/SelectCustom";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useLocalStorage from "@/hooks/useLocalStorage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { mutate } from "swr";
import Loading from "@/components/ui/Loading";

interface Company {
    id: number;
    slug: string;
    name: string;
    department: string;
    email: string;
    numberEmployee: number;
    isActive: string | null;
    role_id: number;
    role_name: string;
  }
  interface ApiResponse {
    headers: string[];
    data: Company[];
    currentPage: number;
    search: string;
    status: string;
  }
  

const DataTable: React.FC<ApiResponse> = ({ headers, data, currentPage, search, status }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null); // Store the currently selected user for status update
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false); // Loading state


    const statusOptions = [
        { label: "Aktif", value: "true" },
        { label: "Tidak Aktif", value: "false" },
    ];

    const handleOpenPopup = (user: Company) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setSelectedUser(null); // Clear selected user
        setSelectedValue(undefined); // Reset selected value
    };

    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const handleStatus = async () => {
        if (!selectedUser) return;

        setIsLoading(true); // Start loading
        try {
            console.log("slug = ", selectedUser.slug);
            // console.log("vacancy id = ", selectedUser.id);
            console.log("status = ", selectedValue);

            // Send the request to the server
            await axiosPrivate.put(`/account/status/update/${selectedUser.slug}`, {
                // vacancy_id: selectedUser.id,
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
            mutate(`/companies/get?page=${currentPage}&limit=10&search=${search}&status=${status}`);
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
                            <TableRow key={user.id}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                            <TableCell>{user.name ?? "-"}</TableCell>
                            <TableCell className="text-center">{user.email ?? "-"}</TableCell>
                            <TableCell className="text-center">{user.department ?? "-"}</TableCell>
                            <TableCell className="text-center">{user.numberEmployee ?? "-"}</TableCell>
                            <TableCell className={`text-center font-medium ${user.isActive === "true" ? "text-green-500" : "text-red-500"}`}>
                                {user.isActive === "true" ? "Aktif" : "Tidak Aktif"}
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
                                                    <Link className="w-full" href={`/data-pengguna/akun-instansi/detail/${user.id}`}>
                                                        <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Detail
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                        <button onClick={() => handleOpenPopup(user)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                                            Ubah Status
                                                        </button>
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
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center">Tidak ada data</TableCell>
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
                                label="Status Akun"
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
