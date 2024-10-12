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

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TambahKonsultasi = () => {
    const [bannerFile, setBannerFile] = useState<File | null>(null); // State for managing banner file

    const breadcrumbItems = [
        { label: 'Ketenagakerjaan', logo: <BreadInformasi /> },
        { label: 'Konsultasi', href: "/layanan-ketenagakerjaan/konsultasi" },
        { label: 'Tambah' },
    ];

    // kategori
    const kategoriOptions = [
        { label: "Sertifikasi", value: "Sertifikasi" },
        { label: "Pelatihan", value: "Pelatihan" },
        { label: "Event", value: "Event" },
        { label: "Konsultasi", value: "Konsultasi" },
    ];
    // kategori
    // level
    const levelOptions = [
        { label: "Rendah", value: "Rendah" },
        { label: "Menengah", value: "Menengah" },
        { label: "Tinggi", value: "Tinggi" },
    ];
    // level

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
            setValue('banner', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    // Banner

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const onSubmit: SubmitHandler<konsultasiFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        const formData = new FormData();
        formData.append('judul_konsultasi', data.judul_konsultasi);
        formData.append('kategori', data.kategori);
        formData.append('tempat', data.tempat);
        formData.append('kuota_peserta', data.kuota_peserta);
        formData.append('tanggal_mulai', data.tanggal_mulai);
        formData.append('tanggal_selesai', data.tanggal_selesai);
        formData.append('jam', data.jam);
        formData.append('no_wa', data.no_wa);
        formData.append('link', data.link);
        formData.append('deskripsi', data.deskripsi);
        formData.append('banner', data.banner);


        try {
            // await axiosPrivate.post("/galeri/create", formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            console.log(data);
            // alert
            // alert
            // navigate.push('/data-master/kelola-galeri');
            // reset();
        } catch (error: any) {
            // Extract error message from API response
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
                className="flex gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
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
                            <Label label="Judul Pelatihan" />
                            <Input
                                type="text"
                                placeholder="Judul Pelatihan"
                                {...register('judul_konsultasi')}
                                className={`${errors.judul_konsultasi ? 'border-red-500' : ''}`}
                            />
                            {errors.judul_konsultasi && (
                                <HelperError>{errors.judul_konsultasi.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Kategori" />
                            <Controller
                                name="kategori"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Kategori"
                                        options={kategoriOptions}
                                        placeholder="Pilih Kategori"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.kategori ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.kategori && <HelperError>{errors.kategori.message}</HelperError>}
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
                                {...register('tempat')}
                                className={`${errors.tempat ? 'border-red-500' : ''}`}
                            />
                            {errors.tempat && (
                                <HelperError>{errors.tempat.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Kuota Peserta" />
                            <Input
                                type="number"
                                placeholder="Kuota Peserta"
                                {...register('kuota_peserta')}
                                className={`${errors.kuota_peserta ? 'border-red-500' : ''}`}
                            />
                            {errors.kuota_peserta && (
                                <HelperError>{errors.kuota_peserta.message}</HelperError>
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
                                {...register('tanggal_mulai')}
                                className={`${errors.tanggal_mulai ? 'border-red-500' : ''}`}
                            />
                            {errors.tanggal_mulai && (
                                <HelperError>{errors.tanggal_mulai.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tanggal Selesai" />
                            <Input
                                type="date"
                                placeholder="Tanggal Selesai"
                                {...register('tanggal_selesai')}
                                className={`${errors.tanggal_selesai ? 'border-red-500' : ''}`}
                            />
                            {errors.tanggal_selesai && (
                                <HelperError>{errors.tanggal_selesai.message}</HelperError>
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
                                {...register('jam')}
                                className={`${errors.jam ? 'border-red-500' : ''}`}
                            />
                            {errors.jam && (
                                <HelperError>{errors.jam.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                        <Label label="Nomor WhatsApp" />
                            <Input
                                type="text"
                                placeholder="Nomor WhatsApp"
                                {...register('no_wa')}
                                className={`${errors.no_wa ? 'border-red-500' : ''}`}
                            />
                            {errors.no_wa && (
                                <HelperError>{errors.no_wa.message}</HelperError>
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
                                {...register('link')}
                                className={`${errors.link ? 'border-red-500' : ''}`}
                            />
                            {errors.link && (
                                <HelperError>{errors.link.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/* deskripsi */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Deskripsi" />
                            <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                                <ReactQuill
                                    className='h-[270px]'
                                    onChange={(value) => setValue('deskripsi', value)}
                                />
                            </div>
                            {errors.deskripsi && (
                                <HelperError>{errors.deskripsi.message}</HelperError>
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
                                    id="banner-upload"
                                />
                                <label
                                    htmlFor="banner-upload"
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
                            {errors.banner && (
                                <HelperError>{errors.banner.message}</HelperError>
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