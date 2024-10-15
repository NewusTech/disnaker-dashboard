/* eslint-disable @next/next/no-img-element */
"use client";
import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { CustomSelect } from '@/components/SelectCustom';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import BreadInformasi from '../../../../../../../public/assets/icons/BreadInformasi';
import { konsultasiFormData, konsultasi } from '@/validations';
import { useGetKategoriFilter } from '@/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { showAlert } from '@/lib/swalAlert';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TambahKonsultasi = () => {

    const breadcrumbItems = [
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Konsultasi', href: "/layanan-ketenagakerjaan/konsultasi" },
        { label: 'Tambah' },
    ];

    // category_id
    // INTEGRASI
    const { data : dataKategori } = useGetKategoriFilter();
    const category_idOptions = dataKategori?.data.map((category: { name: string; id: number; }) => ({
        label: category.name,
        value: category.id,
    }));
    // INTEGRASI
    // category_id

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<konsultasiFormData>({
        resolver: zodResolver(konsultasi),
    });

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

    const onSubmit: SubmitHandler<konsultasiFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category_id', data.category_id);
        formData.append('location', data.location);
        formData.append('quota', data.quota.toString());
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('time', data.time);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('regisLink', data.regisLink);
        formData.append('desc', data.desc);
        formData.append('image', data.image);


        try {
            await axiosPrivate.post("/consultation/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(data);
            // alert
            showAlert('success', 'Data berhasil ditambahkan!');
            // alert
            navigate.push('/layanan-ketenagakerjaan/konsultasi');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
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
                href="/layanan-ketenagakerjaan/konsultasi"
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
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Judul Konsultasi" />
                            <Input
                                type="text"
                                placeholder="Judul Konsultasi"
                                {...register('title')}
                                className={`${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && (
                                <HelperError>{errors.title.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Kategori" />
                            <Controller
                                name="category_id"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Kategori"
                                        options={category_idOptions}
                                        placeholder="Pilih Kategori"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.category_id ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.category_id && <HelperError>{errors.category_id.message}</HelperError>}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tempat" />
                            <Input
                                type="text"
                                placeholder="Tempat"
                                {...register('location')}
                                className={`${errors.location ? 'border-red-500' : ''}`}
                            />
                            {errors.location && (
                                <HelperError>{errors.location.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Kuota Peserta" />
                            <Input
                                type="number"
                                placeholder="Kuota Peserta"
                                {...register('quota')}
                                className={`${errors.quota ? 'border-red-500' : ''}`}
                            />
                            {errors.quota && (
                                <HelperError>{errors.quota.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tanggal Mulai" />
                            <Input
                                type="date"
                                placeholder="Tanggal Mulai"
                                {...register('startDate')}
                                className={`${errors.startDate ? 'border-red-500' : ''}`}
                            />
                            {errors.startDate && (
                                <HelperError>{errors.startDate.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tanggal Selesai" />
                            <Input
                                type="date"
                                placeholder="Tanggal Selesai"
                                {...register('endDate')}
                                className={`${errors.endDate ? 'border-red-500' : ''}`}
                            />
                            {errors.endDate && (
                                <HelperError>{errors.endDate.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Jam Mulai" />
                            <Input
                                type="text"
                                placeholder="11:00 Wib - 15:00 Wib"
                                {...register('time')}
                                className={`${errors.time ? 'border-red-500' : ''}`}
                            />
                            {errors.time && (
                                <HelperError>{errors.time.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                        <Label label="Nomor WhatsApp" />
                            <Input
                                type="text"
                                placeholder="Nomor WhatsApp"
                                {...register('phoneNumber')}
                                className={`${errors.phoneNumber ? 'border-red-500' : ''}`}
                            />
                            {errors.phoneNumber && (
                                <HelperError>{errors.phoneNumber.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Link Pendaftaran" />
                            <Input
                                type="text"
                                placeholder="www.example.com"
                                {...register('regisLink')}
                                className={`${errors.regisLink ? 'border-red-500' : ''}`}
                            />
                            {errors.regisLink && (
                                <HelperError>{errors.regisLink.message}</HelperError>
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
                                    className='h-[270px]'
                                    onChange={(value) => setValue('desc', value)}
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
                    <Link href="/layanan-ketenagakerjaan/konsultasi" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm  rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300'>
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

export default TambahKonsultasi