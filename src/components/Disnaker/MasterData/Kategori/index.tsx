import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import HelperError from "@/components/ui/HelperError";
// import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DeletePopupTitik from "@/components/AksiPopup";

// Define schema for form validation using Zod
const kategoriSchema = z.object({
    kategori: z.string().min(1, "Kategori harus diisi"),
});

interface FormData {
    kategori: string;
}

interface DataTableProps {
    data: Array<{
        id: number;
        name: string;
    }>;
    currentPage: number; // Add currentPage as a prop
}

const DataTable: React.FC<DataTableProps> = ({ data, currentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null); // ID of the selected kategori
    const [loading, setLoading] = useState(false);

    // Form setup with React Hook Form and Zod for validation
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(kategoriSchema),
    });

    // Fetch kategori data when a kategori is selected for editing
    const handleOpenPopup = async (id: number) => {
        setIsOpen(true);
        setSelectedId(id); // Set the selected kategori ID

        try {
            //   const response = await axios.get(`/api/kategori/${id}`); // Fetch kategori data from API
            //   const kategoriData = response.data.data;
            //   setValue("kategori", kategoriData.kategori); // Set fetched kategori data to form
        } catch (error) {
            console.error("Error fetching kategori data:", error);
        }
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        reset(); // Reset form values when closing the popup
        setSelectedId(null); // Clear the selected kategori ID
    };

    // Handle form submission to update kategori
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        if (selectedId === null) return; // Ensure there is a selected ID

        setLoading(true);
        try {
            //   await axios.put(`/api/kategori/update/${selectedId}`, formData); // Send update request to API
            console.log("Kategori updated successfully", formData);
            console.log("ID :", selectedId);
        } catch (error) {
            console.error("Error updating kategori:", error);
        } finally {
            setLoading(false);
            handleClosePopup();
        }
    };

    return (
        <div className="Table mt-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center  w-[100px]">No</TableHead>
                        <TableHead className="text-start">Kategori</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-center w-[100px]">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell className="text-start">{user.name}</TableCell>
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
                                            <DropdownMenuContent className="w-fit bg-white">
                                                <DropdownMenuLabel className="font-semibold text-primary text-sm w-full shadow-md">
                                                    Pilih Aksi
                                                </DropdownMenuLabel>
                                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                                                <DropdownMenuItem>
                                                    <button className="w-full text-start" onClick={() => handleOpenPopup(user.id)}>
                                                        Edit
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                    <DeletePopupTitik onDelete={async () => Promise.resolve()} />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Popup for editing kategori */}
            {isOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-lg relative w-[500px] md:mx-0 mx-4">
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">
                            x
                        </button>
                        <div className="heda mb-5 flex flex-col gap-1 justify-center items-center">
                            <div className="text-lg font-medium">
                                Edit Master Data Kategori Pekerjaan
                            </div>
                            <div className="">
                                Input data yang diperlukan
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                autoFocus
                                placeholder="Masukkan Kategori Pekerjaan"
                                {...register('kategori')}
                                className={errors.kategori ? 'border-red-500' : ''}
                            />
                            {errors.kategori && (
                                <HelperError>{String(errors.kategori.message)}</HelperError> // Convert error to string
                            )}
                            <div className="flex gap-3 justify-end mt-5">
                                <Button
                                    type='button'
                                    variant="outlinePrimary"
                                    className='w-[100px]  rounded-full py-2'
                                    onClick={handleClosePopup}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" className="py-2 rounded-full" disabled={loading}>
                                    {loading ? 'Loading...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
