"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import PaginationTable from '@/components/PaginationTable';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Disnaker/MasterData/Kelurahan';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BreadMaster from '../../../../../../public/assets/icons/BreadMaster';
import { useGetKelurahan } from '@/api';

// Schema validation for new kelurahan
const kelurahanSchema = z.object({
    kelurahan: z.string().min(1, "Kelurahan harus diisi"),
});

interface FormData {
    kelurahan: string;
}

const Kelurahan = () => {
    const breadcrumbItems = [
        { label: 'Master Data', logo: <BreadMaster /> },
        { label: 'Kelurahan' },
    ];


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };

    // serach
    const [search, setSearch] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1
    };
    // serach

    // INTEGRASI
    const { data, error, isLoading } = useGetKelurahan(currentPage, search);
    // INTEGRASI

    // State for controlling pop-up visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form setup using React Hook Form and Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(kelurahanSchema),
    });

    // Handle form submission for adding a new kelurahan
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        setLoading(true);
        try {
            // Simulate API call to add kelurahan
            console.log("Kelurahan added:", formData);
            setIsPopupOpen(false); // Close pop-up after submission
            reset(); // Reset form
        } catch (error) {
            console.error("Error adding kelurahan:", error);
        } finally {
            setLoading(false);
        }
    };

    // Open pop-up
    const handleOpenPopup = () => setIsPopupOpen(true);

    // Close pop-up
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        reset(); // Reset form when closing the pop-up
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3">
                <Input
                    placeholder="Pencarian"
                    leftIcon={<SearchIcon />}
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button className="flex gap-3 items-center px-5" onClick={handleOpenPopup}>
                    <Tambah />
                    Tambah Kelurahan
                </Button>
            </div>

            {/* Table */}
            {/* Table */}
            <div className="Table mt-3">
                <DataTable currentPage={currentPage} data={data?.data} />
            </div>

            {/* Pagination */}
            <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                <PaginationTable currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />
            </div>

            {/* Pop-up for adding a new kelurahan */}
            {isPopupOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white p-5 rounded-lg relative w-[500px] md:mx-0 mx-4"
                    >
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        <div className="heda mb-5 flex flex-col gap-1 justify-center items-center">
                            <div className="text-lg font-medium">
                                Tambah Master Data Kelurahan
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
                            {errors.kelurahan && <p className="text-red-500 text-sm mt-1">{errors.kelurahan.message}</p>}

                            <div className="flex justify-end mt-4 gap-3">
                                <Button
                                    type='button'
                                    variant="outlinePrimary"
                                    className='w-[100px]  rounded-full py-2'
                                    onClick={handleClosePopup}
                                >
                                    Batal
                                </Button>
                                <Button className='rounded-full' type="submit" disabled={loading}>
                                    {loading ? 'Loading..' : 'Tambah'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Kelurahan;
