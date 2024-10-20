"use client"
import Breadcrumb from '@/components/BreadCrumb';
// import BarChart from '@/components/Dashboard/BarChart'
import React from 'react'
import Garis from '@/components/ui/garis';
import { PosisiChart } from '@/components/Dashboard/PosisiChart';
import { PendidikanChart } from '@/components/Dashboard/PendidikanChart';
import dynamic from 'next/dynamic';
import BreadDashboard from '../../../../public/assets/icons/BreadDashboard';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Report from './Report';

const BarChart = dynamic(() => import('@/components/Dashboard/BarChart'), { ssr: false });
const DashboardDisnaker = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Dashboard', logo: <BreadDashboard /> },
    ];
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/*  */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
                <div className="flex bg-white p-5 rounded-lg border border-line-stroke flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/news.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="">JUMLAH TOTAL BERITA</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border border-line-stroke flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/upcoming.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="">JUMLAH TOTAL EVENT</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border border-line-stroke flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                    <div className="icon flex flex-col gap-2 items-center">
                        <div className="">
                            <Image
                                src="/assets/images/presentation.png"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-[45px] object-contain"
                            />
                        </div>
                        <div className="">JUMLAH TOTAL LATIHAN</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
            </div>
            {/*  */}

            {/* tabs */}
            <div className="tabs my-6">
                <Tabs defaultValue="lorem"  className="w-full">
                    <TabsList className='flex gap-4'>
                        <TabsTrigger value="lorem">Lorem</TabsTrigger>
                        <TabsTrigger value="pengaduan">Pengaduan</TabsTrigger>
                        <TabsTrigger value="IndeksKepuasan">Indeks Kepuasan</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lorem">
                        <Report />
                    </TabsContent>
                    <TabsContent value="pengaduan">
                    konten 2
                    </TabsContent>
                    <TabsContent value="IndeksKepuasan">
                    konten 3
                    </TabsContent>
                </Tabs>
            </div>
            {/* tabs */}


            <div className="barchart my-6 bg-white p-5 rounded-lg shadow-md">
                <div className="head">
                    <div className="">Statistik Tenaga Kerja</div>
                    <div className="font-semibold">Klasifikasi tenaga kerja pria dan wanita Kabupaten Tanggamus</div>
                    <Garis />
                </div>
                <BarChart />
            </div>
            <div className="flex gap-4">
                <div className="left w-1/2 bg-white p-5 rounded-lg shadow-md">
                    <div className="head">
                        <div className="">Statistik Tenaga Kerja</div>
                        <div className="font-semibold">Berdasarkan Pendidikan</div>
                        <Garis />
                        <PendidikanChart />
                    </div>
                </div>
                <div className="right w-1/2 bg-white p-5 rounded-lg shadow-md">
                    <div className="head">
                        <div className="">Statistik Tenaga Kerja</div>
                        <div className="font-semibold">Berdasarkan Posisi</div>
                        <Garis />
                        <PosisiChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardDisnaker