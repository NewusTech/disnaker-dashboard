/* eslint-disable @next/next/no-img-element */
"use client";
import Breadcrumb from '@/components/BreadCrumb'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { beritaEdit, beritaEditFormData } from '@/validations';
import { CustomSelect } from '@/components/SelectCustom';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { useGetBeritaGetSlug, useGetKategoriFilter } from '@/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';
import BreadBerita from '../../../../../../../public/assets/icons/BreadBerita';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditBerita = () => {

    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Berita', logo: <BreadBerita /> },
        { label: 'Edit', },  // No logo 
    ];

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm<beritaEditFormData>({
        resolver: zodResolver(beritaEdit),
    });

    // GET ONE SLUG
    // Integrasi API
    const { slug } = useParams();
    const { data: dataUser } = useGetBeritaGetSlug(slug as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("title", dataUser?.data?.title ?? '');
                setValue("desc", dataUser?.data?.desc ?? '');
                if (dataUser?.data?.image) {
                    setImagePreview(dataUser?.data?.image);
                }
            }, 1000); // Set the delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);


    const handleDeskChange = (content: string) => {
        setValue('desc', content); // Update form value when editor content changes
    };
    // GET ONE SLUG

    // Banner
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    // Banner

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<beritaEditFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('desc', data.desc);
        formData.append('title', data.title);
        // Memeriksa jika image ada sebelum menambahkannya ke formData
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            await axiosPrivate.put(`/artikel/update/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(data);
            // alert
            showAlert('success', 'Data berhasil diperbarui!');
            // alert
            navigate.push('/berita');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal memperbarui data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false); // Set loading to false once the process is complete
        }
        // mutate(`galeri/get?page=1`);
    };
    // 
    return (
        <div className='flex flex-col gap-4'>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/berita"
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
                                    className='h-[270px] overflow-auto'
                                    value={getValues('desc')}
                                    onChange={handleDeskChange}
                                />
                            </div>
                            {errors.desc && (
                                <HelperError>{errors.desc.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/* Banner upload section */}
                    {/* Banner upload section */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Foto Banner" />
                            <div className="text-editor h-[260px] bg-white border border-dashed border-[#D9D9D9] rounded-lg overflow-hidden flex justify-center items-center p-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer text-center w-full h-full flex justify-center items-center"
                                >
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            width={300} // provide a fallback width
                                            height={200} // provide a fallback height
                                            className="rounded"
                                        />
                                    ) : (
                                        <p>Click to select file</p>
                                    )}
                                </label>
                            </div>
                            {errors.image && (
                                <HelperError>{errors.image.message}</HelperError>
                            )}
                        </div>
                    </div>

                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Link href="/berita" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm  rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" size="lg" className="w-[180px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 text-xs md:text-sm rounded-full">
                        {loading ? (
                            <Loading />
                        ) : (
                            "Simpan"
                        )}
                    </Button>
                </div>
            </form>
            {/* form */}
        </div>
    )
}

export default EditBerita