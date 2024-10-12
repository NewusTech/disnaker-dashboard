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
import { kelolaRoleFormData, kelolaRole } from '@/validations';
import BreadKelola from '../../../../../../../public/assets/icons/BreadKelola';
import Swal from "sweetalert2";
import { mutate } from 'swr';
import { showAlert } from '@/lib/swalAlert';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import SelectMultiplePermission from '@/components/PermissionMultiple';

const TambahRole = () => {

    const breadcrumbItems = [
        { label: 'Kelola Akun', logo: <BreadKelola /> },
        { label: 'Admin' },  // No logo 
        { label: 'Tambah Admin' },
    ];

    // Permission
    const dataPermission = {
        status: 200,
        message: "Get skills successfully",
        data: [
            {
                id: 1,
                name: "Kelola Dashboard"
            },
            {
                id: 2,
                name: "Kelola Instansi"
            },
            {
                id: 3,
                name: "Kelola User"
            },
            {
                id: 4,
                name: "Kelola Pelayanan"
            },
            {
                id: 5,
                name: "Kelola Laporan"
            },
            {
                id: 6,
                name: "Kelola Event"
            },
        ]
    };

    interface PermissionOption {
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
    } = useForm<kelolaRoleFormData>({
        resolver: zodResolver(kelolaRole),
    });

    // 
    // Hooks for local storage, axios, and navigation
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
     const [accessToken] = useLocalStorage("accessToken", "");
     const axiosPrivate = useAxiosPrivate();

    // TAMBAH
    const onSubmit: SubmitHandler<kelolaRoleFormData> = async (data) => {
        setLoading(true);
        try {
            // await axiosPrivate.post("/user/create", data);
            console.log(data)
            showAlert('success', 'Data berhasil ditambahkan!');
            //   reset();
            // navigate.push('/peran-pengguna/pengguna');
        } catch (error: any) {
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false);
        }
        mutate(`/user/get`);
    };
    // 
    return (
        <div className='flex flex-col gap-4'>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/kelola-akun/role"
                className="flex gap-2 items-center px-5 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-2"></div>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col h-[50vh]">
                <div className="mb-2 flex flex-col gap-2">
                    {/*  */}
                    <div className="flex flex-col gap-2 md:lg-3 lg:gap-4">
                        <div className="flex flex-col w-full">
                            <Label label="Nama" />
                            <Input
                                type="text"
                                placeholder="Nama"
                                {...register('name')}
                                className={`${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && (
                                <HelperError>{errors.name.message}</HelperError>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                        <Label label="Pilih Hak Akses" />
                            <Controller
                                name="permission"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SelectMultiplePermission
                                        placeholder='Pilih Permission'
                                        permissionOptions={dataPermission?.data || []}
                                        selectedPermission={dataPermission?.data?.filter(option =>
                                            value?.includes(option.id)
                                        ) || []}
                                        onChange={(selected: PermissionOption[]) => onChange(selected.map(d => d.id))}
                                    />
                                )}
                            />
                            {errors.permission && (
                                <HelperError>{errors.permission.message}</HelperError>
                            )}
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className="mb-10 flex justify-end gap-3 mt-7">
                    <Link href="/kelola-akun/role" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm  rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300'>
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

export default TambahRole