import Breadcrumb from '@/components/BreadCrumb'
import React from 'react'
import BreadPerusahaan from '../../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../../public/assets/icons/BackIcon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Unduh1icon from '../../../../../../../public/assets/icons/Unduh1icon';
import Unduh2Icon from '../../../../../../../public/assets/icons/Unduh2Icon';

const DetailLamaran = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lamaran Pekerjaan', href: "/perusahaan/lamaran-pekerjaan" },  // No logo 
        { label: 'Detail' },  // No logo 
    ];
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <Link
                href="/perusahaan/lamaran-pekerjaan"
                className="flex gap-2 items-center px-5 my-3 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
            >
                <BackIcon />
                Kembali
            </Link>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-4"></div>
            {/* detail */}
            <div className="wrap flex flex-col gap-5">
                {/*  */}
                <div className="w-full py-3 text-center font-medium rounded-full bg-primary/20 text-primary">
                    Posisi Dilamar : UI/UX Design
                </div>
                {/* head */}
                <div className="deskripsi flex flex-col gap-1">
                    <div className="header flex gap-2 items-center">
                        <div className="profil w-[60px] overflow-hidden h-[60px] rounded-full">
                            <Image
                                src="https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D"
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="nama flex flex-col gap-1">
                            <div className="nama font-medium text-lg">Irsyad Abi Izzulhaq</div>
                            <div className="email">irsyadabiizzulhaq@gmail.com</div>
                        </div>
                    </div>
                    <div className="desk text-justify mt-2">
                        Saya Irsyad Abi Izzulhaq lulusan Jurusan Informatika dengan IPK 3,55 dari Universitas Teknokrat Indonesia. Hardskill yang saya kuasai antara lain UI/UX Design, Desain Grafis, Microsoft Word, Microsoft Excel dan Microsoft  Power Point. Tools yang saya gunakan pada bidang desain adalah Figma, Adobe Xd, Corel Draw dan Canva, sedangkan pada bidang Administrasi, Keuangan dan Entry Data saya menggunakan tools Microsoft Office.
                    </div>
                </div>
                {/* biodata */}
                <div className="biodata flex flex-col gap-1">
                    <div className="title font-medium text-lg">Biodata</div>
                    <div className="wrap p-5 rounded-lg border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Nama
                                </div>
                                <div className="desk font-medium">Irsyad Abi Izzulhaq</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Jenis Kelamin
                                </div>
                                <div className="desk font-medium">Laki-laki</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Email
                                </div>
                                <div className="desk font-medium">irsyadabiizzulhaq@gmail.com</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Nomor Telepon
                                </div>
                                <div className="desk font-medium">0895640417123</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Tempat Lahir
                                </div>
                                <div className="desk font-medium">Bandar Lampung</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Tanggal Lahir
                                </div>
                                <div className="desk font-medium">23-02-2000</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Penglaman
                                </div>
                                <div className="desk font-medium">3 Tahun</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Lokasi Terkini
                                </div>
                                <div className="desk font-medium">Tanjung Karang, Kota Bandar Lampung</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Pendidikan Terakhir
                                </div>
                                <div className="desk font-medium">Sarjana</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Jurusan
                                </div>
                                <div className="desk font-medium">Teknik Informatika</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* pendidikan */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Pendidikan</div>
                    <div className="univ font-medium">Universitas Teknokrat Indonesia</div>
                    <div className="jurusan">Teknik Informatika - Sarjana</div>
                    <div className="tanggal flex gap-2 items-center">
                        <div className="">Jul 2018</div>
                        <div className="">-</div>
                        <div className="">Apr 2023</div>
                        <div className="w-[3px] h-[3px] bg-neutral-950 rounded-full"></div>
                        <div className="">3 thn 7 bln</div>
                    </div>
                    <div className="ipk font-medium">IPK 3,98</div>
                    <div className="deskripsi text-justify">
                        Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman
                    </div>
                </div>
                {/* organisasi */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Organisasi</div>
                    <div className="univ font-medium">Organizer UXiD Lampung</div>
                    <div className="jurusan">UXiD Lampung</div>
                    <div className="tanggal flex gap-2 items-center">
                        <div className="">Jul 2018</div>
                        <div className="">-</div>
                        <div className="">Apr 2023</div>
                        <div className="w-[3px] h-[3px] bg-neutral-950 rounded-full"></div>
                        <div className="">Saat ini</div>
                    </div>
                    <div className="deskripsi text-justify">
                        Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman
                    </div>
                </div>
                {/* pengalaman kerja */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Pengalaman Kerja</div>
                    <div className="univ font-medium">UI/UX Designer</div>
                    <div className="jurusan">Newus Technology</div>
                    <div className="tanggal flex gap-2 items-center">
                        <div className="">Jul 2018</div>
                        <div className="">-</div>
                        <div className="">Apr 2023</div>
                        <div className="w-[3px] h-[3px] bg-neutral-950 rounded-full"></div>
                        <div className="">Saat ini</div>
                    </div>
                    <div className="deskripsi text-justify">
                        Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman
                    </div>
                </div>
                {/* sertifikat */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Sertifikat</div>
                    <div className="univ font-medium">UI Design</div>
                    <div className="jurusan">Build With Angga</div>
                    <div className="tanggal flex gap-2 items-center">
                        <div className="">Jul 2018</div>
                        <div className="">-</div>
                        <div className="">Apr 2023</div>
                    </div>
                    <div className="deskripsi text-justify">
                        Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman Selama menjalani pendidikan di Universitas Teknokrat Indonesia saya memiliki beberapa pengalaman
                    </div>
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
                {/* link pendukung */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-lg">Link Pendukung</div>
                    <div className="wrap-card flex gap-3 mt-2">
                        {/*  */}
                        <div className="card w-full flex flex-col gap-2">
                            <Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="profil flex gap-2 items-center">
                                <div className="profil w-[30px] overflow-hidden h-[30px] rounded-full">
                                    <Image
                                        src="https://img.freepik.com/free-vector/instagram-background-gradient-colors_23-2147823814.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
                                        alt="logo"
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="nama transition-all duration-150 hover:text-primary underline">Instagram</div>
                            </Link>
                            {/* <div className="link text-primary">https://irsyadabi.framer.website/</div> */}
                        </div>
                        {/*  */}
                        <div className="card w-full flex flex-col gap-2">
                            <Link target="_blank" rel="noopener noreferrer" href="https://www.newus.id/" className="profil flex gap-2 items-center">
                                <div className="profil w-[30px] overflow-hidden h-[30px] rounded-full">
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/5339/5339181.png"
                                        alt="logo"
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="nama transition-all duration-150 hover:text-primary underline">Portfolio</div>
                            </Link>
                            {/* <div className="link text-primary">https://irsyadabi.framer.website/</div> */}
                        </div>
                        {/*  */}
                        <div className="card w-full flex flex-col gap-2">
                            <Link target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/" className="profil flex gap-2 items-center">
                                <div className="profil w-[30px] overflow-hidden h-[30px] rounded-full">
                                    <Image
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                        alt="logo"
                                        width={400}
                                        height={400}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="nama transition-all duration-150 hover:text-primary underline">Facebook</div>
                            </Link>
                            {/* <div className="link text-primary">https://irsyadabi.framer.website/</div> */}
                        </div>
                    </div>
                </div>
                <div className="garis h-[1px] w-full bg-[#C7C7CD] my-3"></div>
                {/* button */}
                <div className="button flex gap-2 justify-end">
                    <Button className='w-[220px] rounded-full bg-primary hover:bg-primary/80  flex items-center gap-2'>
                        <Unduh1icon />
                        Download Resume
                    </Button>
                    <Button variant="outline" className='w-[220px] rounded-full border-primary flex items-center gap-2 text-primary'>
                        <Unduh2Icon />
                        Download Portfolio
                    </Button>
                </div>
            </div>
            {/* detail */}
        </div>
    )
}

export default DetailLamaran