/* eslint-disable @next/next/no-img-element */
"use client";
import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BackIcon from '../../../../../../public/assets/icons/BackIcon';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { informasi, informasiFormData } from '@/validations';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import BreadInfo from '../../../../../../public/assets/icons/BreadInfo';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TambahInformasi = () => {

    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Informasi', logo: <BreadInfo /> },
        { label: 'Tambah', },  // No logo 
    ];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<informasiFormData>({
        resolver: zodResolver(informasi),
    });

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<informasiFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            await axiosPrivate.post("/information/create", data);
            console.log(data)
            showAlert('success', 'Data berhasil ditambahkan!');
            // Success alert

            navigate.push("/informasi");
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
            showAlert('error', errorMessage);
            //   alert

            console.error("Failed to create user:", error);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
    };
    // 
    return (
        <div className='flex flex-col gap-4'>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/informasi"
                className="flex gap-2 items-center px-5 py-2.5 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-2"></div>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="mb-2 flex flex-col gap-2">
                    {/*  */}
                    <div className="flex flex-col md:justify-between gap-2 md:lg-3 lg:gap-2">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Judul" />
                            <Input
                                type="text"
                                placeholder="Judul"
                                {...register('title')}
                                className={`${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && (
                                <HelperError>{errors.title.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/* desc */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Deskripsi" />
                            <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                                <ReactQuill
                                    className='h-[450px] overflow-auto'
                                    onChange={(value) => setValue('desc', value)}
                                />
                            </div>
                            {errors.desc && (
                                <HelperError>{errors.desc.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Link href="/informasi" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm  rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" size="lg" className="w-[180px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 text-xs md:text-sm rounded-full">
                        {loading ? (
                            <Loading />
                        ) : (
                            "Tambah"
                        )}
                    </Button>
                </div>
            </form>
            {/* form */}
        </div>
    )
}

export default TambahInformasi