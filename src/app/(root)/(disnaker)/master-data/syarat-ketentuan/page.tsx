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
                    Penggunaan Layanan: Pengguna wajib menggunakan layanan ini sesuai dengan ketentuan yang berlaku. Setiap pelanggaran terhadap aturan yang ditetapkan dapat mengakibatkan penghentian akun tanpa pemberitahuan sebelumnya.

                    Kerahasiaan Data: Kami berkomitmen untuk menjaga kerahasiaan data pribadi Anda. Namun, kami tidak bertanggung jawab atas kehilangan data yang diakibatkan oleh pihak ketiga yang tidak berwenang.

                    Kepatuhan Hukum: Dengan menggunakan layanan ini, Anda menyetujui untuk mematuhi semua peraturan perundang-undangan yang berlaku di wilayah hukum tempat Anda mengakses layanan ini.

                    Pembatasan Tanggung Jawab: Kami tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan layanan ini, termasuk tetapi tidak terbatas pada gangguan sistem, virus, atau akses tidak sah ke data pribadi.

                    Perubahan Syarat dan Ketentuan: Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan akan efektif segera setelah dipublikasikan di situs ini.

                    Pengguna Terdaftar: Pengguna wajib mendaftarkan diri dengan informasi yang akurat dan terkini. Akun yang ditemukan menggunakan informasi palsu akan ditangguhkan tanpa pemberitahuan.

                    Hak Kekayaan Intelektual: Semua konten yang tersedia dalam layanan ini, termasuk teks, gambar, dan logo, adalah milik kami atau pihak ketiga yang memiliki lisensi. Penggunaan tanpa izin tertulis dilarang keras.
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
                    <Button type="submit" variant="primary" size="lg" className="w-[340px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 text-xs md:text-sm">
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
