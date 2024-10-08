"use client";
import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import BreadPerusahaan from '../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../public/assets/icons/BackIcon';
import Garis from '@/components/ui/garis';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { lowongan, lowonganFormData } from '@/validations';
import { Textarea } from '@/components/ui/textarea';
import { CustomSelect } from '@/components/SelectCustom';
import SelectMultipleSkill from '@/components/SkillMultiple';
import SelectMultiplePendidikan from '@/components/PendidikanMultiple';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TambahLowongan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lowongan Pekerjaan', href: '/perusahaan/lowongan-pekerjaan' },  // No logo 
        { label: 'Tambah', },  // No logo 
    ];

    // kategori
    const kategoriOptions = [
        { label: "Kesehatan", value: "semua" },
        { label: "Teknologi", value: "Teknologi" },
        { label: "Pertanian", value: "Pertanian" },
    ];
    // kategori
    // kelamin
    const kelaminOptions = [
        { label: "Semua Jenis Kelamin", value: "semua" },
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
    ];
    // kelamin
    // tipe pekerjaan
    const tipePekerjaanOptions = [
        { label: "Full-Time", value: "full-time" },
        { label: "Part-Time", value: "part-time" },
        { label: "Freelance", value: "freelance" },
        { label: "Magang", value: "magang" },
    ];
    // tipe pekerjaan
    // tipe lokasi
    const tipeLokasiOptions = [
        { label: "Onsite", value: "Onsite" },
        { label: "Remote", value: "Remote" },
        { label: "Hybrid", value: "Hybrid" },
    ];
    // tipe lokasi
    // status
    const statusOptions = [
        { label: "Publish", value: "true" },
        { label: "Tidak Publish", value: "false" },
    ];
    // status

    // Skill
    const dataSkill = {
        status: 200,
        message: "Get skills successfully",
        data: [
            {
                id: 1,
                name: "JavaScript"
            },
            {
                id: 2,
                name: "Python"
            },
            {
                id: 3,
                name: "React"
            },
            {
                id: 4,
                name: "Node.js"
            },
            {
                id: 5,
                name: "TypeScript"
            }
        ]
    };

    interface SkillOption {
        id: number;
        name: string;
    }
    // Pendidikan
    const dataPendidikan = {
        status: 200,
        message: "Get skills successfully",
        data: [
            {
                id: 1,
                name: "SMP"
            },
            {
                id: 2,
                name: "SMA"
            },
            {
                id: 3,
                name: "SMK"
            },
            {
                id: 4,
                name: "Sarjana Teknik Informatika"
            },
            {
                id: 5,
                name: "Sarjana Hukum"
            }
        ]
    };

    interface PendidikanOption {
        id: number;
        name: string;
    }


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<lowonganFormData>({
        resolver: zodResolver(lowongan),
    });

    // 
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const onSubmit: SubmitHandler<lowonganFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            // await axiosPrivate.post("/tph/realisasi-padi/create", data);
            console.log(data)

            // Success alert

            // navigate.push("/tanaman-pangan-holtikutura/realisasi");
        } catch (error: any) {
            // Extract error message from API response
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
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
                href="/perusahaan/lowongan-pekerjaan"
                className="flex gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
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
                            <Label label="Posisi" />
                            <Input
                                type="text"
                                placeholder="Posisi"
                                {...register('posisi')}
                                className={`${errors.posisi ? 'border-red-500' : ''}`}
                            />
                            {errors.posisi && (
                                <HelperError>{errors.posisi.message}</HelperError>
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
                            <Label label="Jenis Kelamin" />
                            <Controller
                                name="jenis_kelamin"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Jenis Kelamin"
                                        options={kelaminOptions}
                                        placeholder="Pilih Jenis Kelamin"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.jenis_kelamin ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.jenis_kelamin && (
                                <HelperError>{errors.jenis_kelamin.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Maksimal Usia" />
                            <Input
                                type="number"
                                placeholder="Maksimal Usia"
                                {...register('maksimal_usia')}
                                className={`${errors.maksimal_usia ? 'border-red-500' : ''}`}
                            />
                            {errors.maksimal_usia && (
                                <HelperError>{errors.maksimal_usia.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tipe Pekerjaan" />
                            <Controller
                                name="tipe_pekerjaan"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Tipe Pekerjaan"
                                        options={tipePekerjaanOptions}
                                        placeholder="Pilih Tipe Pekerjaan"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.tipe_pekerjaan ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.tipe_pekerjaan && (
                                <HelperError>{errors.tipe_pekerjaan.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tipe Lokasi" />
                            <Controller
                                name="tipe_lokasi"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Tipe Lokasi"
                                        options={tipeLokasiOptions}
                                        placeholder="Pilih Tipe Lokasi"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.tipe_lokasi ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.tipe_lokasi && (
                                <HelperError>{errors.tipe_lokasi.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Pilih Skill" />
                            <Controller
                                name="skill"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SelectMultipleSkill
                                        placeholder='Pilih Skill'
                                        skillOptions={dataSkill?.data || []}
                                        selectedSkill={dataSkill?.data?.filter(option =>
                                            value?.includes(option.id)
                                        ) || []}
                                        onChange={(selected: SkillOption[]) => onChange(selected.map(d => d.id))}
                                    />
                                )}
                            />
                            {errors.skill && (
                                <HelperError>{errors.skill.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Pengalaman Pekerjaan" />
                            <Input
                                type="number"
                                placeholder="1 Tahun"
                                {...register('pengalaman')}
                                className={`${errors.pengalaman ? 'border-red-500' : ''}`}
                            />
                            {errors.pengalaman && (
                                <HelperError>{errors.pengalaman.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tingkat Pendidikan" />
                            <Controller
                                name="pendidikan"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SelectMultiplePendidikan
                                        placeholder='Pilih Pendidikan'
                                        pendidikanOptions={dataPendidikan?.data || []}
                                        selectedPendidikan={dataPendidikan?.data?.filter(option =>
                                            value?.includes(option.id)
                                        ) || []}
                                        onChange={(selected: PendidikanOption[]) => onChange(selected.map(d => d.id))}
                                    />
                                )}
                            />
                            {errors.pendidikan && (
                                <HelperError>{errors.pendidikan.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Gaji" />
                            <Input
                                type="number"
                                placeholder="Nominal Gaji"
                                {...register('gaji')}
                                className={`${errors.gaji ? 'border-red-500' : ''}`}
                            />
                            {errors.gaji && (
                                <HelperError>{errors.gaji.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Hari Kerja" />
                            <Input
                                type="text"
                                placeholder="Senin - Sabtu"
                                {...register('hari_kerja')}
                                className={`${errors.hari_kerja ? 'border-red-500' : ''}`}
                            />
                            {errors.hari_kerja && (
                                <HelperError>{errors.hari_kerja.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Jam Kerja" />
                            <Input
                                type="text" // Changed to "text" to match schema, or use "number" if needed
                                placeholder="09:00 - 17:00 WIB"
                                {...register('jam_kerja')}
                                className={`${errors.jam_kerja ? 'border-red-500' : ''}`}
                            />
                            {errors.jam_kerja && (
                                <HelperError>{errors.jam_kerja.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Penutupan Lamaran" />
                            <Input
                                type="date"
                                placeholder="Penutupan Lamaran"
                                {...register('penutupan_lamaran')}
                                className={`${errors.penutupan_lamaran ? 'border-red-500' : ''}`}
                            />
                            {errors.penutupan_lamaran && (
                                <HelperError>{errors.penutupan_lamaran.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Status" />
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Status"
                                        options={statusOptions}
                                        placeholder="Pilih Status"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.tipe_lokasi ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.status && (
                                <HelperError>{errors.status.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Deskripsi Pekerjaan" />
                            <Textarea
                                placeholder="Deskripsi Pekerjaan"
                                {...register('deskripsi')}
                                className={`${errors.deskripsi ? 'border-red-500' : ''}`}
                            />
                            {errors.deskripsi && (
                                <HelperError>{errors.deskripsi.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Tanggung Jawab" />
                            <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                                <ReactQuill
                                    className='h-[250px]'
                                    onChange={(value) => setValue('tanggung_jawab', value)}
                                />
                            </div>
                            {errors.tanggung_jawab && (
                                <HelperError>{errors.tanggung_jawab.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="">
                        <div className="flex flex-col mb-2 w-full">
                            <Label label="Persyaratan" />
                            <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                                <ReactQuill
                                    className='h-[250px]'
                                    onChange={(value) => setValue('persyaratan', value)}
                                />
                            </div>
                            {errors.persyaratan && (
                                <HelperError>{errors.persyaratan.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Link href="/perusahaan/lowongan-pekerjaan" className='bg-white w-[140px] text-xs md:text-sm  rounded-lg text-[#3D3D3D] hover:bg-slate-50 p-2 border border-[#3D3D3D] text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" size="lg" className="w-[140px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 text-xs md:text-sm">
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

export default TambahLowongan