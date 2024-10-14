"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import PaginationTable from '@/components/PaginationTable';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/Disnaker/MasterData/Skill';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BreadMaster from '../../../../../../public/assets/icons/BreadMaster';
import { useGetSkill } from '@/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import { mutate } from 'swr';
import Loading from '@/components/ui/Loading';


// Schema validation for new skill
const skillSchema = z.object({
    name: z.string().min(1, "Skill harus diisi"),
});

interface FormData {
    name: string;
}

const Skill = () => {
    const breadcrumbItems = [
        { label: 'Master Data', logo: <BreadMaster /> },
        { label: 'Skill' },
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
    const { data } = useGetSkill(currentPage, search);
    // INTEGRASI

    // State for controlling pop-up visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form setup using React Hook Form and Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(skillSchema),
    });

    // Handle form submission for adding a new skill
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            await axiosPrivate.post("/skill/create", data);
            showAlert('success', 'Data berhasil ditambahkan!');
            setIsPopupOpen(false); // Close pop-up after submission
            reset(); // Reset form
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
            <div className="mt-3 flex gap-5">
                <Input
                    placeholder="Pencarian"
                    leftIcon={<SearchIcon />}
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button className="flex gap-3 items-center px-5" onClick={handleOpenPopup}>
                    <Tambah />
                    Tambah Skill
                </Button>
            </div>

            {/* Table */}
            <div className="Table mt-3">
                <DataTable currentPage={currentPage} data={data?.data} search={search} />
            </div>

            {/* Pagination */}
            <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                <PaginationTable
                    currentPage={currentPage}
                    totalPages={data?.pagination?.totalPages as number}
                    onPageChange={onPageChange}
                />
            </div>

            {/* Pop-up for adding a new skill */}
            {isPopupOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white p-5 rounded-lg relative w-[500px] md:mx-0 mx-4"
                    >
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary">x</button>
                        <div className="heda mb-5 flex flex-col gap-1 justify-center items-center">
                            <div className="text-lg font-medium">
                                Tambah Master Data Skill
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
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                            <div className="flex justify-end mt-4 gap-3">
                                <Button
                                    type='button'
                                    variant="outlinePrimary"
                                    className='w-[100px]  rounded-full py-2'
                                    onClick={handleClosePopup}
                                >
                                    Batal
                                </Button>
                                <Button className='rounded-full w-[110px]' type="submit" disabled={loading}>
                                    {loading ? <Loading /> : 'Tambah'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Skill;
