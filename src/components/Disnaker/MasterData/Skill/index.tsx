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
import useLocalStorage from "@/hooks/useLocalStorage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { showAlert } from "@/lib/swalAlert";
import useSWR, { mutate } from "swr";
import Loading from "@/components/ui/Loading";


// Define schema for form validation using Zod
const skillSchema = z.object({
    name: z.string().min(1, "Skill harus diisi"),
});

interface FormData {
    name: string;
}

interface DataTableProps {
    data: Array<{
        id: number;
        name: string;
    }>;
    currentPage: number; // Add currentPage as a prop
    search: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, currentPage, search }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null); // ID of the selected skill
    const [loading, setLoading] = useState(false);

    // Form setup with React Hook Form and Zod for validation
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(skillSchema),
    });

    // Fetch skill data when a skill is selected for editing
    const handleOpenPopup = async (id: number) => {
        setSelectedId(id); // Set the selected ID
        setIsOpen(true); // Open the popup

        try {
            const response = await axiosPrivate.get(`/skill/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const skillData = response.data?.data;

            if (skillData) {
                // Set the form values with the fetched skill data
                setValue('name', skillData.name);
            }
        } catch (error) {
            console.error("Failed to fetch skill data:", error);
        }
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        reset(); // Reset form values when closing the popup
        setSelectedId(null); // Clear the selected skill ID
    };

    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    // Handle form submission to update skill
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            await axiosPrivate.put(`/skill/update/${selectedId}`, data);
            showAlert('success', 'Data berhasil ditambahkan!');
            reset(); // Reset form
            handleClosePopup();
            // Success alert
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
            showAlert('error', errorMessage);
            //   alert
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }mutate(`/skill/get?page=${currentPage}&limit=10&search=${search}`);
    };

    const handleDelete = async (id: number) => {
        try {
          await axiosPrivate.delete(`/skill/delete/${id}`, {
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
        } mutate(`/skill/get?page=${currentPage}&limit=10&search=${search}`);
      };

    return (
        <div className="Table mt-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center w-[100px]">No</TableHead>
                        <TableHead className="text-start">Skill</TableHead>
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
                                                <DeletePopupTitik onDelete={() => handleDelete(user.id)} />
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

            {/* Popup for editing skill */}
            {isOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-lg relative w-[500px] md:mx-0 mx-4">
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">
                            x
                        </button>
                        <div className="heda mb-5 flex flex-col gap-1 justify-center items-center">
                            <div className="text-lg font-medium">
                                Edit Master Data Skill
                            </div>
                            <div className="">
                                Input data yang diperlukan
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                autoFocus
                                placeholder="Masukkan Skill"
                                {...register('name')}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <HelperError>{String(errors.name.message)}</HelperError> // Convert error to string
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
                                <Button type="submit" className="py-2 rounded-full w-[110px]" disabled={loading}>
                                    {loading ? <Loading /> : 'Simpan'}
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
