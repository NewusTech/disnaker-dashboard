"use client"
import Breadcrumb from '@/components/BreadCrumb';
// import BarChart from '@/components/Dashboard/BarChart'
import React from 'react'
import BreadDashboard from '../../../../../public/assets/icons/BreadDashboard';
import Garis from '@/components/ui/garis';
import { PosisiChart } from '@/components/Dashboard/PosisiChart';
import { PendidikanChart } from '@/components/Dashboard/PendidikanChart';
import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/Dashboard/BarChart'), { ssr: false });
const Dashboard = () => {
  const breadcrumbItems = [
    // { label: 'Home', href: '/', logo: <FaHome /> }, 
    { label: 'Dashboard', logo: <BreadDashboard /> },
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
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

export default Dashboard