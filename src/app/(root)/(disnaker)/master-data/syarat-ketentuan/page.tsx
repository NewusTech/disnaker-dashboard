"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BreadMaster from '../../../../../../public/assets/icons/BreadMaster';
import Label from '@/components/ui/label';
import HelperError from '@/components/ui/HelperError';
import 'react-quill/dist/quill.snow.css';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { useGetSnk } from '@/api';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Schema validation for new syaratKetentuan
const syaratKetentuanSchema = z.object({
    syaratKetentuan: z.string().min(1, "Syarat dan Ketentuan harus diisi"),
});

interface FormData {
    syaratKetentuan: string;
}

const SyaratKetentuan = () => {
    const breadcrumbItems = [
        { label: 'Master Data', logo: <BreadMaster /> },
        { label: 'Syarat dan Ketentuan' },
    ];


    // State for controlling pop-up visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // INTEGRASI
    const { data } = useGetSnk();
    // INTEGRASI

    // Form setup using React Hook Form and Zod
    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(syaratKetentuanSchema),
    });

    // Handle form submission for adding a new syaratKetentuan
    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        setLoading(true);
        try {
            // Simulate API call to add syaratKetentuan
            console.log("SyaratKetentuan added:", formData);
            setIsPopupOpen(false); // Close pop-up after submission
            reset(); // Reset form
        } catch (error) {
            console.error("Error adding syaratKetentuan:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="wrap border shadow border-line-stroke flex my-4 flex-col rounded-xl overflow-hidden">
                <div className="head bg-primary text-white py-4 text-center">
                    Syarat dan Ketentuan
                </div>
                <div className="desk text-justify p-4 text-sm">
                    <div
                        className="prose max-w-none text-justify"
                        dangerouslySetInnerHTML={{ __html: data?.data?.desc || "Tidak Ada Syarat dan Ketentuan" }}
                    />
                </div>
            </div>
            {/*  */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="">
                    <Label label='Syarat dan Ketentuan' />
                    <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                        <ReactQuill
                            className='h-[350px]'
                            onChange={(value) => setValue('syaratKetentuan', value)}
                        />
                    </div>
                    {errors.syaratKetentuan && (
                        <HelperError>{errors.syaratKetentuan.message}</HelperError>
                    )}
                </div>
                <div className="w-full flex justify-center">
                    <Button type="submit" variant="primary" className="w-[340px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 text-xs md:text-sm">
                        {loading ? (
                            <Loading />
                        ) : (
                            "Simpan"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SyaratKetentuan;
