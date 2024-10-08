"use client";

import Breadcrumb from '@/components/BreadCrumb';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import SearchIcon from '../../../../../public/assets/icons/SearchIcon';
import { CustomSelect } from '@/components/SelectCustom';
import PaginationTable from '@/components/PaginationTable';
import Link from 'next/link';
import BreadPelamarIcon from '../../../../../public/assets/icons/BreadPelamarIcon';
import DataTable from '@/components/perusahaan/pelamar/UndangPelamar';

const UndangPage = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Pelamar', logo: <BreadPelamarIcon /> },
        { label: 'Undang Pelamar' },  // No logo 
    ];

    // select
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const statusOptions = [
        { label: "Semua", value: "semua" },
        { label: "UI/UX", value: "UI/UX" },
        { label: "Frontend", value: "Frontend" },
    ];
    // select

    // Dummy data
    const dummyData = [
        {
            name: "Irsyad Abi Izzulhaq",
            education: "Sarjana",
            experience: "3 Tahun",
            status: "Siap Bekerja",
            description:
                "Saya, Irsyad Abi Izzulhaq, merupakan lulusan Jurusan Informatika dengan IPK 3,55 dari Universitas Teknokrat Indonesia. Selama masa studi, saya telah mengembangkan berbagai hardskill yang relevan di bidang teknologi dan desain. Beberapa kemampuan yang saya kuasai antara lain UI/UX Design, di mana saya berpengalaman dalam merancang antarmuka pengguna yang intuitif dan menyenangkan melalui wireframing, prototyping, dan usability testing menggunakan tools seperti Figma dan Adobe XD. Selain itu, saya juga memiliki keahlian dalam desain grafis, dengan kemampuan menggunakan software seperti Adobe Photoshop dan Illustrator untuk menciptakan berbagai desain visual. Saya juga mahir dalam Microsoft Office, baik untuk keperluan presentasi, pengolahan data, maupun manajemen dokumen. Kombinasi dari kemampuan teknis dan pengalaman praktis ini menjadikan saya siap untuk berkontribusi secara efektif di berbagai proyek dan pekerjaan yang memerlukan keterampilan dalam desain dan teknologi.",
            skills: [
                "UI Design",
                "Desain Web",
                "Kerja Tim",
                "UX Design",
                "Front End Developer"
            ]
        },
        {
            name: "Ahmad Fauzan",
            education: "Diploma",
            experience: "2 Tahun",
            status: "Sudah Bekerja",
            description:
                "Ahmad Fauzan memiliki latar belakang pendidikan di bidang Desain Grafis dan telah bekerja sebagai desainer di beberapa perusahaan. Dengan pengalaman lebih dari 2 tahun, dia memiliki kemampuan dalam Adobe Illustrator, Photoshop, dan InDesign. Selain itu, Ahmad juga terbiasa bekerja dalam tim untuk mengembangkan konsep visual dan kampanye pemasaran.",
            skills: ["Graphic Design", "Adobe Photoshop", "Team Collaboration"]
        },
        {
            name: "Nurul Fajriyah",
            education: "Sarjana",
            experience: "4 Tahun",
            status: "Siap Bekerja",
            description:
                "Nurul Fajriyah adalah seorang profesional dengan pengalaman lebih dari 4 tahun dalam bidang Pengembangan Web. Dia menguasai HTML, CSS, JavaScript, dan berbagai framework seperti React dan Vue.js. Nurul memiliki pengalaman dalam bekerja di proyek-proyek skala besar serta mampu bekerja dalam tim untuk mengembangkan aplikasi web interaktif.",
            skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Team Leadership"]
        },
        {
            name: "Rizky Pratama",
            education: "Magister",
            experience: "5 Tahun",
            status: "Tidak Bekerja",
            description:
                "Rizky Pratama memiliki gelar Magister di bidang Manajemen Proyek dan telah bekerja sebagai manajer proyek selama 5 tahun. Dia memiliki pengalaman dalam mengelola tim lintas fungsi, merencanakan dan menjalankan proyek IT dengan sukses. Kemampuan kepemimpinannya yang kuat serta pemahaman yang mendalam tentang metodologi Agile dan Scrum membuatnya menjadi pemimpin yang efektif.",
            skills: ["Project Management", "Agile", "Scrum", "Team Management"]
        },
        {
            name: "Dian Fitriani",
            education: "Sarjana",
            experience: "1 Tahun",
            status: "Siap Bekerja",
            description:
                "Dian Fitriani adalah lulusan baru di bidang Ilmu Komputer dengan fokus pada Data Science. Dia memiliki pengalaman magang di beberapa perusahaan teknologi di mana dia belajar tentang analisis data, machine learning, dan visualisasi data. Dian mahir dalam Python, SQL, dan alat-alat seperti Tableau dan PowerBI.",
            skills: ["Python", "SQL", "Data Analysis", "Machine Learning", "Tableau", "PowerBI"]
        }
    ];
    

    // Define table headers
    const tableHeaders = ["No", "Posisi", "Nama", "Email", "Nomer Telepon", "Tanggal Dilamar", "Status", "Aksi"];
    // pagination
    const [currentPage, setCurrentPage] = useState(3);
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    };
    // pagination


    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex gap-3 items-center">
                <Input
                    placeholder='Pencarian'
                    leftIcon={<SearchIcon />}
                />
                <CustomSelect
                    label="Pilih Filter"
                    options={statusOptions}
                    placeholder="Pilih Filter"
                    value={selectedValue}
                    onChange={setSelectedValue}
                    width="w-full"
                />
            </div>
            {/* table */}
            <div className="Table mt-3">
                <DataTable
                    headers={tableHeaders}
                    data={dummyData}
                />
            </div>
            {/* table */}
            {/* pagination */}
            <div className="pagi flex mt-5 items-center justify-center pb-5 lg:pb-0">
                    <PaginationTable
                    currentPage={1}
                    totalPages={15}
                    onPageChange={onPageChange}
                    />
                </div>
            {/* pagination */}
        </div>
    )
}

export default UndangPage