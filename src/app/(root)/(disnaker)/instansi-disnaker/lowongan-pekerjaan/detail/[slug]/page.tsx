"use client"
import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import BreadPerusahaan from '../../../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import PerusahaanDetail from '../../../../../../../../public/assets/icons/PerusahaanDetail';
import AlamatDetail from '../../../../../../../../public/assets/icons/AlamatDetail';
import PendidikanDetail from '../../../../../../../../public/assets/icons/PendidikanDetail';
import KelaminDetail from '../../../../../../../../public/assets/icons/KelaminDetail';
import GajiDetail from '../../../../../../../../public/assets/icons/GajiDetail';
import PengalamanDetail from '../../../../../../../../public/assets/icons/PengalamanDetail';
import UsiaDetail from '../../../../../../../../public/assets/icons/UsiaDetail';
import HariDetail from '../../../../../../../../public/assets/icons/HariDetail';
import JamDetail from '../../../../../../../../public/assets/icons/JamDetail';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useGetLowonganGetSlug } from '@/api';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Swal from "sweetalert2";
import { mutate } from 'swr';
import Loading from '@/components/ui/Loading';


const DetailLowongan = () => {
    const [isLoadingPublish, setIsLoadingPublish] = useState(false); // Loading state
    const [isLoadingUnpublish, setIsLoadingUnpublish] = useState(false); // Loading state
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lowongan Pekerjaan', href: "/instansi-disnaker/lowongan-pekerjaan" },  // No logo 
        { label: 'Detail' },  // No logo 
    ];
    // Integrasi API
    const { slug } = useParams();
    const { data } = useGetLowonganGetSlug(slug as string);
    // handle publish
    // Kondisi untuk men-disable tombol jika status selain 'tolak'
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    // Extract isPublished from data if it exists
    const isPublished = data?.data?.isPublished === "true";

    const handlePublish = async () => {
        setIsLoadingPublish(true); // Start loading
        try {
            // Send the request to the server
            const response = await axiosPrivate.put(`/vacancy/status/update/${slug}`, {
                vacancy_id: data?.data?.id, // Correctly extract the vacancy_id
                status: "true",
            });

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                text: 'Status telah diperbarui di sistem!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status!';
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: errorMessage,
                showConfirmButton: true,
                customClass: {
                    confirmButton: "bg-primary", // Warna biru untuk tombol konfirmasi
                },
            });
        } finally {
            setIsLoadingPublish(false); // Stop loading
            mutate(`/vacancy/get/${slug}`);
        }
    };

    const handleTidakPublish = async () => {
        setIsLoadingUnpublish(true); // Start loading
        try {
            // Send the request to the server
            const response = await axiosPrivate.put(`/vacancy/status/update/${slug}`, {
                vacancy_id: data?.data?.id, // Correctly extract the vacancy_id
                status: "false",
            });

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                text: 'Status telah diperbarui di sistem!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status!';
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: errorMessage,
                showConfirmButton: true,
                customClass: {
                    confirmButton: "bg-primary", // Warna biru untuk tombol konfirmasi
                },
            });
        } finally {
            setIsLoadingUnpublish(false); // Stop loading
            mutate(`/vacancy/get/${slug}`);
        }
    };

    // handle publish
    // Integrasi API
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/instansi-disnaker/lowongan-pekerjaan"
                className="flex gap-2 items-center px-5 my-3 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-4"></div>
            {/* detail */}
            <div className={`w-full py-3 mb-3 text-center font-medium rounded-full ${isPublished ? "bg-primary/20 text-primary" : "bg-error/20 text-error"}`}>
                    Status Lowongan : {isPublished ? "Publish" : "Tidak Publish"}
                </div>
            <div className="wrap flex flex-col gap-5">
                <div className="head flex flex-col gap-3">
                    <div className="title font-semibold text-xl">{data?.data.title ?? "-"}</div>
                    <div className="flex gap-4 items-center">
                        <div className="kategori flex items-center gap-1">
                            <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
                            {data?.data?.VacancyCategory?.name ?? "-"}
                        </div>
                        <div className="tipelokasi flex items-center gap-1">
                            <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
                            {data?.data?.jobType ?? "-"}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="perusahaan flex items-center gap-1">
                            <PerusahaanDetail />
                            {data?.data?.Company?.name ?? "-"}
                        </div>
                        <div className="alamat flex items-center gap-1">
                            <AlamatDetail />
                            {data?.data?.Company?.address ?? "-"}
                        </div>
                    </div>
                </div>
                {/* deskripsi */}
                <div className="deskripsi flex flex-col gap-1">
                    <div className="title font-medium text-lg">Deksripsi</div>
                    <div className="teks text-justify">{data?.data?.desc ?? "-"}</div>
                </div>
                {/* detail */}
                <div className="detail flex flex-col gap-1">
                    <div className="title font-medium text-lg">Detail Pekerjaan</div>
                    <div className="wrap p-5 rounded-lg border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <PendidikanDetail />
                                    Pendidikan
                                </div>
                                <div className="desk font-medium">
                                    {data?.data?.EducationLevels?.length ? (
                                        <p>
                                            {data.data.EducationLevels.map((education) => education.level).join('/')}
                                        </p>
                                    ) : (
                                        <p>Belum ada informasi pendidikan.</p>
                                    )}
                                </div>
                            </div>

                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <KelaminDetail />
                                    Jenis Kelamin
                                </div>
                                <div className="desk font-medium">
                                    {data?.data?.gender ?? "-"}
                                </div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <GajiDetail />
                                    Gaji
                                </div>
                                <div className="desk font-medium">
                                    Rp. {data?.data?.salary ? Number(data.data.salary).toLocaleString('id-ID') : '0'}
                                </div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <PengalamanDetail />
                                    Pengalaman
                                </div>
                                <div className="desk font-medium">Minimal {data?.data?.minExperience ?? "-"} Tahun</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <AlamatDetail />
                                    Tipe Lokasi
                                </div>
                                <div className="desk font-medium">{data?.data?.jobType ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <UsiaDetail />
                                    Usia
                                </div>
                                <div className="desk font-medium">Maksimal {data?.data?.maxAge ?? "-"} Tahun</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <HariDetail />
                                    Hari Kerja
                                </div>
                                <div className="desk font-medium">{data?.data?.workingDay ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <JamDetail />
                                    Jam Kerja
                                </div>
                                <div className="desk font-medium">{data?.data?.workingHour ?? "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* tanggung jawab */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Tanggung Jawab</div>
                    <div className="teks">
                        {data?.data?.responsibility ?? "-"}
                    </div>
                </div>
                {/* persyaratan */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Persyaratan</div>
                    <div className="teks">
                        {data?.data?.requirement ?? "-"}
                    </div>
                </div>
                {/* skill */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Skill Yang Dibutuhkan</div>
                    <div className="wrap-card flex gap-3 mt-2 flex-wrap">
                        {data?.data?.VacancySkills?.length ? (
                            data?.data?.VacancySkills.map((skill) => (
                                <div
                                    key={skill?.Skill?.id} // Ensure each item has a unique key
                                    className="card flex-shrink-0 p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                                >
                                    {skill?.Skill?.name} {/* Display the skill name */}
                                </div>
                            ))
                        ) : (
                            <p>Belum ada skill yang ditentukan.</p>
                        )}
                    </div>
                </div>
                <div className="garis h-[1px] w-full bg-[#C7C7CD] my-3"></div>
                {/* button */}
                <div className="button flex gap-2 justify-end">
                    <Button
                        disabled={!isPublished}
                        onClick={handleTidakPublish}
                        className='w-[200px] rounded-full bg-[#DF1212] hover:bg-[#DF1212]/80'
                    >
                       {isLoadingUnpublish ? <Loading/> : 'Tidak Publish'}
                    </Button>
                    <Button
                        disabled={isPublished}
                        onClick={handlePublish}
                        className='w-[200px] rounded-full'
                    >
                        {isLoadingPublish ? <Loading/> : 'Publish'}
                    </Button>
                </div>
            </div>
            {/* detail */}
        </div>
    )
}

export default DetailLowongan