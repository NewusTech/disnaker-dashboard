/* eslint-disable @next/next/no-img-element */
"use client";
import Breadcrumb from '@/components/BreadCrumb';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
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
import BreadInfo from '../../../../../../../public/assets/icons/BreadInfo';
import { useGetInformasiGetId } from '@/api';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditInformasi = () => {
    const breadcrumbItems = [
        { label: 'Informasi', logo: <BreadInfo /> },
        { label: 'Edit' },
    ];

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<informasiFormData>({
        resolver: zodResolver(informasi),
    });

    const { id } = useParams();
    const { data: dataUser } = useGetInformasiGetId(id as string);

    // State lokal untuk deskripsi
    const [localDesc, setLocalDesc] = useState<string>('');

    useEffect(() => {
        if (dataUser?.data) {
            // Set nilai awal dari API ke form
            setValue("title", dataUser?.data?.title ?? '');
            setValue("desc", dataUser?.data?.desc ?? '');
            setLocalDesc(dataUser?.data?.desc ?? ''); // Set ke state lokal untuk ReactQuill
        }
    }, [dataUser, setValue]);

    // Fungsi ini menangani perubahan di editor Quill
    const handleDeskChange = (content: string) => {
        setValue('desc', content); // Update nilai deskripsi di form saat ada perubahan di editor
        setLocalDesc(content); // Update nilai deskripsi lokal
    };

    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<informasiFormData> = async (data) => {
        if (!data.desc) {
            setValue('desc', getValues('desc')); // Pastikan deskripsi tidak kosong
        }

        setLoading(true); // Set loading saat submit
        try {
            await axiosPrivate.put(`/information/update/${id}`, data);
            showAlert('success', 'Data berhasil diperbarui!');
            navigate.push("/informasi");
        } catch (error: any) {
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

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
                    {/* title */}
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
                    {/* desc */}
                    <div className="flex flex-col mb-2 w-full">
                        <Label label="Deskripsi" />
                        <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                            <ReactQuill
                                className='h-[270px] overflow-auto'
                                value={localDesc} // Menggunakan state lokal
                                onChange={handleDeskChange}
                            />
                        </div>
                        {errors.desc && (
                            <HelperError>{errors.desc.message}</HelperError>
                        )}
                    </div>
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Link href="/informasi" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" size="lg" className="w-[180px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-xs md:text-sm rounded-full">
                        {loading ? <Loading /> : "Simpan"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditInformasi;
