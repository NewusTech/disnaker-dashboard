import Breadcrumb from '@/components/BreadCrumb';
import React from 'react'
import BreadDashboard from '../../../../public/assets/icons/BreadDashboard';
import Image from 'next/image';
import Garis from '@/components/ui/garis';
import dynamic from 'next/dynamic';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const BarChartInstansi = dynamic(() => import('./BarchartInstansi'), { ssr: false });
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "dilamar", visitors: 187, fill: "var(--color-dilamar)" },
    { browser: "wawancara", visitors: 200, fill: "var(--color-wawancara)" },
    { browser: "tes", visitors: 275, fill: "var(--color-tes)" },
    { browser: "diterima", visitors: 173, fill: "var(--color-diterima)" },
    { browser: "ditolak", visitors: 90, fill: "var(--color-ditolak)" },
]
const chartConfig = {
    visitors: {
        label: "Pelamar",
    },
    dilamar: {
        label: "Telah Dilamar",
        color: "#656565",
    },
    wawancara: {
        label: "Wawancara",
        color: "#FC6736",
    },
    tes: {
        label: "Tes",
        color: "#2F55D4",
    },
    diterima: {
        label: "Diterima",
        color: "#399918",
    },
    ditolak: {
        label: "Ditolak",
        color: "#DF1212",
    },
} satisfies ChartConfig

const DashboardInstansi = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Dashboard', logo: <BreadDashboard /> },
    ];
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/*  */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
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
                        <div className="">JUMLAH TOTAL PELATIHAN</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
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
                        <div className="">JUMLAH TOTAL SERTIFIKASI</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
                <div className="flex bg-white p-5 rounded-lg border shadow-md flex-col gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
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
                        <div className="">JUMLAH TOTAL KONSULTASI</div>
                    </div>
                    <div className="total font-semibold text-3xl">65</div>
                </div>
            </div>
            {/*  */}
            {/* barchart */}
            <div className="barchart my-8 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                <div className="head">
                    <div className="">Statistik Tenaga Kerja</div>
                    <div className="font-semibold ">Statistik Lowongan Pekerjaan pria dan wanita provinsi Tanggamus</div>
                    <Garis />
                </div>
                <BarChartInstansi />
            </div>

            {/* status */}
            <div className="my-8 bg-white p-5 rounded-lg border shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                <div className="head flex items-center justify-between">
                    <div className="font-semibold">Statistik Status Lowongan Aktif</div>
                    <div className="">
                        <Select>
                            <SelectTrigger className="w-[200px] rounded-full bg-primary text-white">
                                <SelectValue placeholder="Lowongan" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectLabel>Lowongan Pekerjaan</SelectLabel>
                                    <SelectItem value="software_engineer">Software Engineer</SelectItem>
                                    <SelectItem value="ui_ux_designer">UI/UX Designer</SelectItem>
                                    <SelectItem value="marketing_specialist">Marketing Specialist</SelectItem>
                                    <SelectItem value="data_analyst">Data Analyst</SelectItem>
                                    <SelectItem value="product_manager">Product Manager</SelectItem>
                                    <SelectItem value="content_writer">Content Writer</SelectItem>
                                    <SelectItem value="customer_service">Customer Service</SelectItem>
                                    <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="human_resources">Human Resources</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="my-6">
                    <Card>
                        <CardContent>
                            <ChartContainer className="h-[400px] w-full" config={chartConfig}>
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="browser"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) =>
                                            chartConfig[value as keyof typeof chartConfig]?.label
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel className='bg-white' />}
                                    />
                                    <Bar
                                        dataKey="visitors"
                                        strokeWidth={2}
                                        radius={8}
                                        activeIndex={2}
                                        activeBar={({ ...props }) => {
                                            return (
                                                <Rectangle
                                                    {...props}
                                                    fillOpacity={0.8}
                                                    stroke={props.payload.fill}
                                                    strokeDasharray={4}
                                                    strokeDashoffset={4}
                                                />
                                            )
                                        }}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* status */}
        </div>
    )
}

export default DashboardInstansi