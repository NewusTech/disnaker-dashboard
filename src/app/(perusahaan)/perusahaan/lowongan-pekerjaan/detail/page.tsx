import Breadcrumb from '@/components/BreadCrumb'
import React from 'react'
import BreadPerusahaan from '../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../public/assets/icons/BackIcon';
import PerusahaanDetail from '../../../../../../public/assets/icons/PerusahaanDetail';
import AlamatDetail from '../../../../../../public/assets/icons/AlamatDetail';
import PendidikanDetail from '../../../../../../public/assets/icons/PendidikanDetail';
import KelaminDetail from '../../../../../../public/assets/icons/KelaminDetail';
import GajiDetail from '../../../../../../public/assets/icons/GajiDetail';
import PengalamanDetail from '../../../../../../public/assets/icons/PengalamanDetail';
import UsiaDetail from '../../../../../../public/assets/icons/UsiaDetail';
import HariDetail from '../../../../../../public/assets/icons/HariDetail';
import JamDetail from '../../../../../../public/assets/icons/JamDetail';
import { Button } from '@/components/ui/button';

const DetailLowongan = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Perusahaan', logo: <BreadPerusahaan /> },
        { label: 'Lowongan Pekerjaan', href: "/perusahaan/lowongan-pekerjaan" },  // No logo 
        { label: 'Detail' },  // No logo 
    ];
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/perusahaan/lowongan-pekerjaan"
                className="flex gap-2 items-center px-5 my-3 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-4"></div>
            {/* detail */}
            <div className="wrap flex flex-col gap-5">
                <div className="head flex flex-col gap-3">
                    <div className="title font-semibold text-xl">UI/UX Designer</div>
                    <div className="flex gap-4 items-center">
                        <div className="kategori flex items-center gap-1">
                            <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
                            IT
                        </div>
                        <div className="tipelokasi flex items-center gap-1">
                            <div className="w-[6px] h-[6px] bg-primary rounded-full"></div>
                            Full-Time
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="perusahaan flex items-center gap-1">
                            <PerusahaanDetail />
                            PT Newus Technolody
                        </div>
                        <div className="alamat flex items-center gap-1">
                            <AlamatDetail />
                            Jl Kebersihan Gg . Lisna no 77 Sukadana Ham
                        </div>
                    </div>
                </div>
                {/* deskripsi */}
                <div className="deskripsi flex flex-col gap-1">
                    <div className="title font-medium text-lg">Deksripsi</div>
                    <div className="teks text-justify">Sebagai bagian dari pembangunan server, basis data, dan API untuk aplikasi Disnaker, kamu akan memiliki peran penting dalam menjaga performa sistem agar selalu optimal, sambil memastikan keamanan data pengguna tetap terjaga. Pendekatan yang terorganisir dan efisien pastinya akan sangat membantu, apalagi dalam memastikan API berjalan mulus tanpa hambatan. Mengingat latar belakangmu dengan project yang fokus pada performa dan keamanan, pasti akan memberi keuntungan besar di sini. Jangan lupa, penggunaan tools atau metode yang sudah terbukti, seperti debugging yang efisien dengan console.log, juga bisa diterapkan untuk menjaga stabilitas pengembangan server ini!</div>
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
                                <div className="desk font-medium">SMA/SMK/S1</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <KelaminDetail />
                                    Jenis Kelamin
                                </div>
                                <div className="desk font-medium">Semua Jenis Kelamin</div>
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
                                <div className="desk font-medium">Rp. 3.000.000 </div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <PengalamanDetail />
                                    Pengalaman
                                </div>
                                <div className="desk font-medium">Minimal 1 Tahun</div>
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
                                <div className="desk font-medium">Remote</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <UsiaDetail />
                                    Usia
                                </div>
                                <div className="desk font-medium">Maksimal 50 Tahun</div>
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
                                <div className="desk font-medium">Senin - Sabtu</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-2">
                                <div className="title flex items-center gap-1">
                                    <JamDetail />
                                    Jam Kerja
                                </div>
                                <div className="desk font-medium">09:00 - 17:00 WIB</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* tanggung jawab */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Tanggung Jawab</div>
                    <div className="teks">Sebagai bagian dari pembangunan server, basis data, dan API untuk aplikasi Disnaker, kamu akan memiliki peran penting dalam menjaga performa sistem agar selalu optimal, sambil memastikan keamanan data pengguna tetap terjaga. Pendekatan yang terorganisir dan efisien pastinya akan sangat membantu, apalagi dalam memastikan API berjalan mulus tanpa hambatan. Mengingat latar belakangmu dengan project yang fokus pada performa dan keamanan, pasti akan memberi keuntungan besar di sini. Jangan lupa, penggunaan tools atau metode yang sudah terbukti, seperti debugging yang efisien dengan console.log, juga bisa diterapkan untuk menjaga stabilitas pengembangan server ini!</div>
                </div>
                {/* persyaratan */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Persyaratan</div>
                    <div className="teks">Sebagai bagian dari pembangunan server, basis data, dan API untuk aplikasi Disnaker, kamu akan memiliki peran penting dalam menjaga performa sistem agar selalu optimal, sambil memastikan keamanan data pengguna tetap terjaga. Pendekatan yang terorganisir dan efisien pastinya akan sangat membantu, apalagi dalam memastikan API berjalan mulus tanpa hambatan. Mengingat latar belakangmu dengan project yang fokus pada performa dan keamanan, pasti akan memberi keuntungan besar di sini. Jangan lupa, penggunaan tools atau metode yang sudah terbukti, seperti debugging yang efisien dengan console.log, juga bisa diterapkan untuk menjaga stabilitas pengembangan server ini!</div>
                </div>
                {/* skill */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Skill Yang Dibutuhkan</div>
                    <div className="wrap-card flex gap-3 mt-2">
                        <div className="card p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                            UI Design
                        </div>
                        <div className="card p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                            Desain Web
                        </div>
                        <div className="card p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                            Kerja Tim
                        </div>
                        <div className="card p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                            UX Design
                        </div>
                        <div className="card p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                            Front End Developer
                        </div>
                    </div>
                </div>
                <div className="garis h-[1px] w-full bg-[#C7C7CD] my-3"></div>
                {/* button */}
                <div className="button flex gap-2 justify-end">
                    <Button className='w-[200px] rounded-full bg-[#DF1212] hover:bg-[#DF1212]/80'>Tidak Publish</Button>
                    <Button className='w-[200px] rounded-full '>Publish</Button>
                </div>
            </div>
            {/* detail */}
        </div>
    )
}

export default DetailLowongan