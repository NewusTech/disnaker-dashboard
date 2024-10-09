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
const kelurahanSchema = z.object({
    kelurahan: z.string().min(1, "Kelurahan harus diisi"),
});

interface FormData {
    kelurahan: string;
}

interface DataTableProps {
    data: Array<{
        no: number;
        kelurahan: string;
        id: number; // Added id here to identify kelurahan
    }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null); // ID of the selected kelurahan
    const [loading, setLoading] = useState(false);

    // Form setup with React Hook Form and Zod for validation
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(kelurahanSchema),
    });

    // Fetch kelurahan data when a kelurahan is selected for editing
    const handleOpenPopup = async (id: number) => {
        setIsOpen(true);
        setSelectedId(id); // Set the selected kelurahan ID

        try {
            //   const response = await axios.get(`/api/kelurahan/${id}`); // Fetch kelurahan data from API
            //   const kelurahanData = response.data.data;
            //   setValue("kelurahan", kelurahanData.kelurahan); // Set fetched kelurahan data to form
        } catch (error) {
            console.error("Error fetching kelurahan data:", error);
        }
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        reset(); // Reset form values when closing the popup
        setSelectedId(null); // Clear the selected kelurahan ID
    };

    // Handle form submission to update kelurahan
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        if (selectedId === null) return; // Ensure there is a selected ID

        setLoading(true);
        try {
            //   await axios.put(`/api/kelurahan/update/${selectedId}`, formData); // Send update request to API
            console.log("Kelurahan updated successfully", formData);
            console.log("ID :", selectedId);
        } catch (error) {
            console.error("Error updating kelurahan:", error);
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
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-start">Kelurahan</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.no}>
                            <TableCell className="text-center w-[100px]">{user.no}</TableCell>
                            <TableCell className="text-start">{user.kelurahan}</TableCell>
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
                    ))}
                </TableBody>
            </Table>

            {/* Popup for editing kelurahan */}
            {isOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-lg relative w-[500px] md:mx-0 mx-4">
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">
                            x
                        </button>
                        <div className="heda mb-5 flex flex-col gap-1 justify-center items-center">
                            <div className="text-lg font-medium">
                                Edit Master Data Kelurahan
                            </div>
                            <div className="">
                                Input data yang diperlukan
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                autoFocus
                                placeholder="Masukkan Kelurahan"
                                {...register('kelurahan')}
                                className={errors.kelurahan ? 'border-red-500' : ''}
                            />
                            {errors.kelurahan && (
                                <HelperError>{String(errors.kelurahan.message)}</HelperError> // Convert error to string
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
