"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../../public/assets/icons/SearchIcon';
import PaginationTable from '@/components/PaginationTable';
import { Button } from '@/components/ui/button';
import BreadPelayanan from '../../../../../../public/assets/icons/BreadPelayanan';
import DataTable from '@/components/Disnaker/MasterData/Skill';
import Tambah from '../../../../../../public/assets/icons/Tambah';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema validation for new skill
const skillSchema = z.object({
    skill: z.string().min(1, "Skill harus diisi"),
});

interface FormData {
    skill: string;
}

const Skill = () => {
    const breadcrumbItems = [
        { label: 'Pelayanan', logo: <BreadPelayanan /> },
        { label: 'Kartu Kuning' },
    ];

    // Dummy data
    const dummyData = [
        { no: 1, id: 1, skill: "UI/UX Design" },
        { no: 2, id: 2, skill: "Front-End Dev" },
        { no: 3, id: 3, skill: "Back-End Dev" },
        { no: 4, id: 4, skill: "Mobile App Dev" },
        { no: 5, id: 5, skill: "Project Management" },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);

    // State for controlling pop-up visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form setup using React Hook Form and Zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(skillSchema),
    });

    // Handle form submission for adding a new skill
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        setLoading(true);
        try {
            // Simulate API call to add skill
            console.log("Skill added:", formData);
            setIsPopupOpen(false); // Close pop-up after submission
            reset(); // Reset form
        } catch (error) {
            console.error("Error adding skill:", error);
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
                <Input placeholder="Pencarian" leftIcon={<SearchIcon />} />
                <Button className="flex gap-3 items-center px-10" onClick={handleOpenPopup}>
                    <Tambah />
                    Tambah Skill
                </Button>
            </div>

            {/* Table */}
            <div className="Table mt-3">
                <DataTable data={dummyData} />
            </div>

            {/* Pagination */}
            <div className="pagi flex items-center justify-center pb-5 lg:pb-0">
                <PaginationTable currentPage={currentPage} totalPages={15} onPageChange={onPageChange} />
            </div>

            {/* Pop-up for adding a new skill */}
            {isPopupOpen && (
                <div onClick={handleClosePopup} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        onClick={(e) => e.stopPropagation()} // Prevents click from closing pop-up when interacting inside
                        className="bg-white p-5 rounded-lg relative w-[800px]"
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
                                placeholder="Masukkan Skill"
                                {...register('skill')}
                                className={errors.skill ? 'border-red-500' : ''}
                            />
                            {errors.skill && <p className="text-red-500 text-sm mt-1">{errors.skill.message}</p>}

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

export default Skill;
