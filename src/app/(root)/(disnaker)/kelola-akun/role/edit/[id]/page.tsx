/* eslint-disable @next/next/no-img-element */
"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import HelperError from '@/components/ui/HelperError';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import Label from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { kelolaRoleFormData, kelolaRole } from '@/validations';
import BreadKelola from '../../../../../../../../public/assets/icons/BreadKelola';
import { mutate } from 'swr';
import { showAlert } from '@/lib/swalAlert';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import SelectMultiplePermission from '@/components/PermissionMultiple';
import { useGetHakAkses, useGetRoleGetId } from '@/api';

const TambahRole = () => {
    const breadcrumbItems = [
        { label: 'Kelola Akun', logo: <BreadKelola /> },
        { label: 'Role' },  // Tidak ada logo 
        { label: 'Tambah Role' },
    ];

    // Permission
    const { data: dataHakAkses } = useGetHakAkses();
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

    // GET ONE SLUG
    // Integrasi API
    const { id } = useParams();
    const { data: dataUser } = useGetRoleGetId(id as string);

    useEffect(() => {
        if (dataUser?.data) {
            const timer = setTimeout(() => {
                setValue("name", dataUser?.data?.name ?? '');
                // 
                const permissionsList = Array.isArray(dataUser?.data)
                    ? dataUser?.data?.map(item => item.id)
                    : [];
                setValue("permissions", permissionsList ?? '');
            }, 1000); // Set the delay in milliseconds (1000 ms = 1 second)

            return () => clearTimeout(timer); // Clean up the timeout on component unmount or data change
        }
    }, [dataUser, setValue]);

    // GET ONE SLUG

    // Hooks untuk local storage, axios, dan navigasi
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    // Fungsi submit untuk tambah data
    const onSubmit: SubmitHandler<kelolaRoleFormData> = async (data) => {
        setLoading(true);
        try {
            await axiosPrivate.put(`/role/update/${id}`, data);
            showAlert('success', 'Data berhasil ditambahkan!');
            navigate.push("/kelola-akun/role");
        } catch (error: any) {
            const errorMessage = error.response?.data?.data?.[0]?.message || 'Gagal menambahkan data!';
            showAlert('error', errorMessage);
        } finally {
            setLoading(false);
        }
        mutate(`/role/get`);
    };

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

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between flex-col h-[50vh]">
                <div className="mb-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:lg-3 lg:gap-4">
                        {/* Input Nama */}
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

                        {/* Select Hak Akses */}
                        <div className="flex flex-col w-full">
                            <Label label="Pilih Hak Akses" />
                            <Controller
                                name="permissions"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SelectMultiplePermission
                                        placeholder='Pilih Hak Akses'
                                        permissionOptions={dataHakAkses?.data || []}
                                        selectedPermission={dataHakAkses?.data?.filter((option: { id: number }) =>
                                            value?.includes(option.id)
                                        ) || []}
                                        onChange={(selected: PermissionOption[]) => onChange(selected.map(d => d.id))}
                                    />
                                )}
                            />
                            {errors.permissions && (
                                <HelperError>{errors.permissions.message}</HelperError>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-10 flex justify-end gap-3 mt-7">
                    <Link href="/kelola-akun/role" className='bg-error hover:bg-error/80 w-[180px] text-xs md:text-sm rounded-full text-white p-2 text-center font-medium flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1'>
                        Batal
                    </Link>
                    <Button type="submit" variant="primary" className="w-[180px] transition ease-in-out delay-150 hover:-translate-y-1 text-xs md:text-sm rounded-full">
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

export default TambahRole;
