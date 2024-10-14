"use client";
import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import BreadPerusahaan from '../../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
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
import { useGetKategoriFilter, useGetPendidikanFilter, useGetSkillFilter } from '@/api';
import { showAlert } from '@/lib/swalAlert';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditLowongan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lowongan Pekerjaan', href: '/instansi-disnaker/lowongan-pekerjaan' },  // No logo 
        { label: 'Edit', },  // No logo 
    ];
    
    const [limit, setLimit] = useState(10000);


    // kategori
    // INTEGRASI
    const { data : dataKategori } = useGetKategoriFilter();
    const kategoriOptions = dataKategori?.data.map((category: { name: string; id: number; }) => ({
        label: category.name,
        value: category.id,
    }));
    // INTEGRASI
    // kategori

    // kelamin
    const kelaminOptions = [
        { label: "Semua Jenis Kelamin", value: "Semua" },
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
    ];
    // kelamin
    // tipe pekerjaan
    const tipePekerjaanOptions = [
        { label: "Full-Time", value: "Full Time" },
        { label: "Part-Time", value: "Part Time" },
        { label: "Freelance", value: "Freelance" },
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
    const { data : dataSkill } = useGetSkillFilter();
    interface SkillOption {
        id: number;
        name: string;
    }
    // Skill

    // Pendidikan
    const { data : dataPendidikan } = useGetPendidikanFilter();
    interface PendidikanOption {
        id: number;
        level: string;
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
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    const onSubmit: SubmitHandler<lowonganFormData> = async (data) => {
        setLoading(true); // Set loading to true when the form is submitted
        try {
            await axiosPrivate.post("/vacancy/create", data);
            console.log(data)
            showAlert('success', 'Data berhasil ditambahkan!');
            // Success alert

            navigate.push("/instansi-disnaker/lowongan-pekerjaan");
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
                href="/instansi-disnaker/lowongan-pekerjaan"
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
                            <Label label="Posisi" />
                            <Input
                                type="text"
                                placeholder="Posisi"
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
                                        options={kategoriOptions}
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
                            <Label label="Jenis Kelamin" />
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Jenis Kelamin"
                                        options={kelaminOptions}
                                        placeholder="Pilih Jenis Kelamin"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.gender ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.gender && (
                                <HelperError>{errors.gender.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Maksimal Usia" />
                            <Input
                                type="number"
                                placeholder="Maksimal Usia"
                                {...register('maxAge')}
                                className={`${errors.maxAge ? 'border-red-500' : ''}`}
                            />
                            {errors.maxAge && (
                                <HelperError>{errors.maxAge.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tipe Pekerjaan" />
                            <Controller
                                name="jobType"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Tipe Pekerjaan"
                                        options={tipePekerjaanOptions}
                                        placeholder="Pilih Tipe Pekerjaan"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.jobType ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.jobType && (
                                <HelperError>{errors.jobType.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tipe Lokasi" />
                            <Controller
                                name="workLocation"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        label="Pilih Tipe Lokasi"
                                        options={tipeLokasiOptions}
                                        placeholder="Pilih Tipe Lokasi"
                                        value={field.value}
                                        onChange={(option) => field.onChange(option || '')}
                                        width={`w-full ${errors.workLocation ? 'border-red-500' : ''}`}
                                    />
                                )}
                            />
                            {errors.workLocation && (
                                <HelperError>{errors.workLocation.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Pilih Skill" />
                            <Controller
                                name="skills"
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
                            {errors.skills && (
                                <HelperError>{errors.skills.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Pengalaman Pekerjaan" />
                            <Input
                                type="number"
                                placeholder="1 Tahun"
                                {...register('minExperience')}
                                className={`${errors.minExperience ? 'border-red-500' : ''}`}
                            />
                            {errors.minExperience && (
                                <HelperError>{errors.minExperience.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Tingkat Pendidikan" />
                            <Controller
                                name="educationLevels"
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
                            {errors.educationLevels && (
                                <HelperError>{errors.educationLevels.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Gaji" />
                            <Input
                                type="number"
                                placeholder="Nominal Gaji"
                                {...register('salary')}
                                className={`${errors.salary ? 'border-red-500' : ''}`}
                            />
                            {errors.salary && (
                                <HelperError>{errors.salary.message}</HelperError>
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
                                {...register('workingDay')}
                                className={`${errors.workingDay ? 'border-red-500' : ''}`}
                            />
                            {errors.workingDay && (
                                <HelperError>{errors.workingDay.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Jam Kerja" />
                            <Input
                                type="text" // Changed to "text" to match schema, or use "number" if needed
                                placeholder="09:00 - 17:00 WIB"
                                {...register('workingHour')}
                                className={`${errors.workingHour ? 'border-red-500' : ''}`}
                            />
                            {errors.workingHour && (
                                <HelperError>{errors.workingHour.message}</HelperError>
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
                                {...register('applicationDeadline')}
                                className={`${errors.applicationDeadline ? 'border-red-500' : ''}`}
                            />
                            {errors.applicationDeadline && (
                                <HelperError>{errors.applicationDeadline.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col mb-2 w-full md:w-1/2">
                            <Label label="Penempatan Kerja" />
                            <Input
                                type="text"
                                placeholder="Penempatan Kerja"
                                {...register('location')}
                                className={`${errors.location ? 'border-red-500' : ''}`}
                            />
                            {errors.location && (
                                <HelperError>{errors.location.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:lg-3 lg:gap-5">
                        <div className="flex flex-col mb-2 w-full">
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
                                        width={`w-full ${errors.status ? 'border-red-500' : ''}`}
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
                            <div className="text-editor bg-white border border-[#D9D9D9] rounded-lg overflow-hidden">
                                <ReactQuill
                                    className='h-[250px] overflow-auto'
                                    onChange={(value) => setValue('desc', value)}
                                />
                            </div>
                            {errors.desc && (
                                <HelperError>{errors.desc.message}</HelperError>
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
                                    className='h-[250px] overflow-auto'
                                    onChange={(value) => setValue('responsibility', value)}
                                />
                            </div>
                            {errors.responsibility && (
                                <HelperError>{errors.responsibility.message}</HelperError>
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
                                    className='h-[250px] overflow-auto'
                                    onChange={(value) => setValue('requirement', value)}
                                />
                            </div>
                            {errors.requirement && (
                                <HelperError>{errors.requirement.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3">
                    <Link href="/instansi-disnaker/lowongan-pekerjaan" className='bg-error w-[180px] text-xs md:text-sm  rounded-full text-white hover:bg-error/80 p-2 text-center flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" size="lg" className="w-[180px] rounded-full transition ease-in-out delay-150 hover:-translate-y-1 text-xs md:text-sm">
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

export default EditLowongan