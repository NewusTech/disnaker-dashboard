"use client"

import Breadcrumb from '@/components/BreadCrumb'
import React, { useState } from 'react'
import BreadPerusahaan from '../../../../../../../../public/assets/icons/BreadPerusahaan';
import Link from 'next/link';
import BackIcon from '../../../../../../../../public/assets/icons/BackIcon';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Unduh1icon from '../../../../../../../../public/assets/icons/Unduh1icon';
import Unduh2Icon from '../../../../../../../../public/assets/icons/Unduh2Icon';
import LoadingPage from '@/components/ui/LoadingPage';
import { useParams } from 'next/navigation';
import { useGetLamaranGetId } from '@/api';
import Garis from '@/components/ui/garis';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Swal from 'sweetalert2';
import { CustomSelect } from '@/components/SelectCustom';
import Loading from '@/components/ui/Loading';
import { mutate } from 'swr';

export interface ApplicationData {
    id: number;
}
const DetailLamaran = () => {
    const breadcrumbItems = [
        // { label: 'Home', href: '/', logo: <FaHome /> }, 
        { label: 'Instansi', logo: <BreadPerusahaan /> },
        { label: 'Lamaran Pekerjaan', href: "/instansi-disnaker/lamaran-pekerjaan" },  // No logo 
        { label: 'Detail' },  // No logo 
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<ApplicationData | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const [isLoadingpop, setIsLoadingpop] = useState(false); // Loading state
    const [accessToken] = useLocalStorage("accessToken", "");
    const axiosPrivate = useAxiosPrivate();

    // 
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
    };

    // Function to calculate date difference in years and months
    const calculateDateDifference = (joinDate: string | number | Date, graduationDate: string | number | Date) => {
        const join = new Date(joinDate);
        const grad = new Date(graduationDate);

        let years = grad.getFullYear() - join.getFullYear();
        let months = grad.getMonth() - join.getMonth();

        // If months difference is negative, adjust the years and months
        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} tahun ${months} bulan`;
    };

    // Integrasi API
    const { id } = useParams();
    const { data, isLoading, error } = useGetLamaranGetId(id as string);

    const dataUser = data?.data;

    if (isLoading) {
        return <div >
            <LoadingPage />
        </div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Failed to load data</div>;
    }

    // Status
    const statusOptions = [
        { label: "Dilamar", value: "Dilamar" },
        { label: "Wawancara", value: "Wawancara" },
        { label: "Tes", value: "Tes" },
        { label: "Diterima", value: "Diterima" },
        { label: "Ditolak", value: "Ditolak" },
    ];

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    const handleStatus = async () => {
        setIsLoadingpop(true); // Start loading
        try {
            // Send the request to the server
            await axiosPrivate.put(`/application/update/${dataUser?.id}`, {
                status: selectedValue,
            });

            // console.log("id = ", dataUser?.id)
            // console.log("status = ", selectedValue)

            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                text: 'Status telah diperbarui di sistem!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            console.log("Success to update vacancy status:");
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Gagal memperbarui status!';
            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan!',
                text: errorMessage,
                showConfirmButton: true,
                customClass: {
                    confirmButton: "bg-primary" // Warna biru untuk tombol konfirmasi
                },
            });
            console.error("Failed to update vacancy status:", error);
        } finally {
            setIsLoadingpop(false); // Stop loading
            handleClosePopup(); // Close the popup after operation
            mutate(`/application/get/${dataUser?.id}`);
        }
    };
    // Status

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex justify-between items-center">
                <Link
                    href="/instansi-disnaker/lamaran-pekerjaan"
                    className="flex gap-2 items-center px-5 my-3 py-3 bg-primary hover:bg-primary/80 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 w-fit text-white"
                >
                    <BackIcon />
                    Kembali
                </Link>
                <button onClick={() => handleOpenPopup()} className="flex items-center px-7 text-white py-2.5 bg-primary hover:bg-primary-hover rounded-full">
                    Ubah Status
                </button>
            </div>
            <div className="garis w-full h-[1px] bg-[#C7C7CD] my-4"></div>
            {/* detail */}
            <div className="wrap flex flex-col gap-5">
                {/*  */}
                <div
                    className={`w-full py-3 text-center font-medium rounded-full ${dataUser?.status === 'Dilamar' ? 'bg-[#656565]/20 text-[#656565]' :
                            dataUser?.status === 'Wawancara' ? 'bg-[#FC6736]/20 text-[#FC6736]' :
                                dataUser?.status === 'Tes' ? 'bg-primary/20 text-primary' :
                                    dataUser?.status === 'Diterima' ? 'bg-succes/20 text-succes' :
                                        dataUser?.status === 'Ditolak' ? 'bg-error/20 text-error' :
                                            'bg-gray-300 text-gray-700' // Default style
                        }`}
                >
                    Status Lamaran {dataUser?.status ?? "-"} : {dataUser?.Vacancy?.title ?? "-"}
                </div>
                {/* head */}
                <div className="deskripsi flex flex-col gap-1">
                    <div className="header flex gap-2 items-center">
                        <div className="profil w-[60px] overflow-hidden h-[60px] rounded-full">
                            <Image
                                src={dataUser?.User?.UserProfile?.image ?? "-"}
                                alt="logo"
                                width={400}
                                height={400}
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="nama flex flex-col gap-1">
                            <div className="nama font-medium text-lg">{dataUser?.User?.UserProfile?.name ?? "-"}</div>
                            <div className="email">{dataUser?.User?.email ?? "-"}</div>
                        </div>
                    </div>
                    <div className="desk text-justify mt-2">
                        {dataUser?.User?.UserProfile?.about ?? "-"}
                    </div>
                </div>
                {/* biodata */}
                <div className="biodata flex flex-col gap-1">
                    <div className="title font-medium text-xl">Biodata</div>
                    <div className="wrap p-5 rounded-lg border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Nama
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.name ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Jenis Kelamin
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.gender ?? "-"}</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Email
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.email ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Nomor Telepon
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.phoneNumber ?? "-"}</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Tempat Lahir
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.birthPlace ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Tanggal Lahir
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.birthDate ?? "-"}</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Agama
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.religion ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Lokasi Terkini
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserProfile?.address ?? "-"}</div>
                            </div>
                        </div>
                        <div className="garis w-full h-[1px] bg-[#E4E4E7] my-3"></div>
                        {/*  */}
                        <div className="row flex">
                            <div className="left w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Pendidikan Terakhir
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserEducationHistories[0]?.EducationLevel?.level ?? "-"}</div>
                            </div>
                            <div className="right w-1/2 flex flex-col gap-1">
                                <div className="title flex items-center gap-1">
                                    Jurusan
                                </div>
                                <div className="desk font-medium">{dataUser?.User?.UserEducationHistories[0]?.department ?? "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* pendidikan */}
                <div className="flex flex-col gap-1 mt-1">
                    <div className="title font-medium text-xl">Pendidikan</div>
                    <div className="wrap flex flex-col gap-3 mt-1">
                        {(dataUser?.User?.UserEducationHistories || []).length > 0 ? (
                            dataUser?.User.UserEducationHistories.map((user, index) => (
                                <div className='flex flex-col gap-1' key={index}>
                                    <div className="univ font-semibold">{user?.instanceName ?? "-"}</div>
                                    <div className="jurusan">{user?.department ?? "-"} - {user?.EducationLevel?.level ?? "-"}</div>
                                    <div className="tanggal flex gap-2 items-center">
                                        <div>{formatDate(user?.joinDate) ?? "-"}</div>
                                        <div>-</div>
                                        {user?.isCurrently === "true" ? (
                                            <div>Saat Ini</div>
                                        ) : (
                                            <div>{formatDate(user?.graduationDate) ?? "-"}</div>
                                        )}
                                        <div className={`${user?.isCurrently === "true" ? "hidden" : ""} w-[3px] h-[3px] bg-neutral-950 rounded-full`}></div>
                                        <div>
                                            {user?.isCurrently === "true"
                                                ? ""
                                                : calculateDateDifference(user?.joinDate, user?.graduationDate)}
                                        </div>
                                    </div>
                                    <div className="ipk font-medium">IPK {user?.gpa ?? "-"}</div>
                                    <div className="deskripsi text-justify">
                                        {user?.desc ?? "Tidak ada deskripsi."}
                                    </div>
                                    <div className={`${(dataUser?.User?.UserEducationHistories?.length || 0) - 1 === index ? "hidden" : ""} garis w-full h-[1px] bg-[#C7C7CD] mt-2`}></div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center w-full">Tidak ada pendidikan</div>
                        )}
                    </div>
                </div>
                {/* organisasi */}
                <div className="flex flex-col gap-1 mt-1">
                    <div className="title font-medium text-xl">Organisasi</div>
                    <div className="wrap flex flex-col gap-3 mt-1">
                        {(dataUser?.User?.UserOrganizations || []).length > 0 ? (
                            dataUser?.User.UserOrganizations.map((user, index) => (
                                <div className='flex flex-col gap-1' key={index}>
                                    <div className="univ font-medium">{user?.organizationName ?? "-"}</div>
                                    <div className="jurusan">{user?.name ?? "-"}</div>
                                    <div className="tanggal flex gap-2 items-center">
                                        <div>{formatDate(user?.joinDate) ?? "-"}</div>
                                        <div>-</div>
                                        {user?.isCurrently === "true" ? (
                                            <div>Saat Ini</div>
                                        ) : (
                                            <div>{formatDate(user?.leaveDate) ?? "-"}</div>
                                        )}
                                        <div className={`${user?.isCurrently === "true" ? "hidden" : ""} w-[3px] h-[3px] bg-neutral-950 rounded-full`}></div>
                                        <div>
                                            {user?.isCurrently === "true"
                                                ? ""
                                                : calculateDateDifference(user?.joinDate, user?.leaveDate)}
                                        </div>
                                    </div>
                                    <div className="deskripsi text-justify">
                                        {user?.desc ?? "Tidak ada deskripsi."}
                                    </div>
                                    <div className={`${(dataUser?.User?.UserOrganizations?.length || 0) - 1 === index ? "hidden" : ""} garis w-full h-[1px] bg-[#C7C7CD] mt-2`}></div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center w-full">Tidak ada organisasi</div>
                        )}
                    </div>
                </div>
                {/* pengalaman kerja */}
                <div className="flex flex-col gap-1 mt-1">
                    <div className="title font-medium text-xl">Pengalaman Kerja</div>
                    <div className="wrap flex flex-col gap-3 mt-1">
                        {(dataUser?.User?.UserExperiences || []).length > 0 ? (
                            dataUser?.User?.UserExperiences.map((user, index) => (
                                <div className='flex flex-col gap-1' key={index}>
                                    <div className="univ font-medium">{user?.companyName ?? "-"}</div>
                                    <div className="jurusan">{user?.possition ?? "-"}</div>
                                    <div className="tanggal flex gap-2 items-center">
                                        <div>{formatDate(user?.joinDate) ?? "-"}</div>
                                        <div>-</div>
                                        {user?.isCurrently === "true" ? (
                                            <div>Saat Ini</div>
                                        ) : (
                                            <div>{formatDate(user?.leaveDate) ?? "-"}</div>
                                        )}
                                        <div className={`${user?.isCurrently === "true" ? "hidden" : ""} w-[3px] h-[3px] bg-neutral-950 rounded-full`}></div>
                                        <div>
                                            {user?.isCurrently === "true"
                                                ? ""
                                                : calculateDateDifference(user?.joinDate, user?.leaveDate)}
                                        </div>
                                    </div>
                                    <div className="deskripsi text-justify">
                                        {user?.desc ?? "Tidak ada deskripsi."}
                                    </div>
                                    <div className={`${(dataUser?.User?.UserExperiences?.length || 0) - 1 === index ? "hidden" : ""} garis w-full h-[1px] bg-[#C7C7CD] mt-2`}></div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center w-full">Tidak ada pengalaman</div>
                        )}
                    </div>
                </div>
                {/* sertifikat */}
                <div className="flex flex-col gap-1 mt-1">
                    <div className="title font-medium text-xl">Sertifikat</div>
                    <div className="wrap flex flex-col gap-3 mt-1">
                        {(dataUser?.User?.UserCertificates || []).length > 0 ? (
                            dataUser?.User?.UserCertificates.map((user, index) => (
                                <div className='flex flex-col gap-1' key={index}>
                                    <div className="univ font-medium">{user?.organization ?? "-"}</div>
                                    <div className="jurusan">{user?.name ?? "-"}</div>
                                    <div className="tanggal flex gap-2 items-center">
                                        <div>{formatDate(user?.expiredDate) ?? "-"}</div>
                                    </div>
                                    <div className="deskripsi text-justify">
                                        {user?.desc ?? "Tidak ada deskripsi."}
                                    </div>
                                    <div className="">
                                        <Link target='_blank' className='underline hover:text-primary' href={user?.file ?? "#"}>Lihat Sertifikat</Link>
                                    </div>
                                    <div className={`${(dataUser?.User?.UserCertificates?.length || 0) - 1 === index ? "hidden" : ""} garis w-full h-[1px] bg-[#C7C7CD] mt-2`}></div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center w-full">Tidak ada sertifikat</div>
                        )}
                    </div>
                </div>
                {/* skill */}
                <div className="flex flex-col gap-1 mt-3">
                    <div className="title font-medium text-xl">Skill Yang Dibutuhkan</div>
                    <div className="wrap-card flex gap-3 mt-2 flex-wrap">
                        {(dataUser?.User?.Skills || []).length > 0 ? (
                            dataUser?.User?.Skills.map((user, index) => (
                                <div key={index} className="card p-2 flex-shrink-0 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                                    {user?.name}
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center w-full">Tidak ada sertifikat</div>
                        )}
                    </div>
                </div>
                {/* link pendukung */}
                <div className="flex flex-col gap-1">
                    <div className="title font-medium text-xl">Link Pendukung</div>
                    <div className="wrap-card flex gap-3 mt-2">
                        {dataUser?.User?.UserLinks?.map((userLink) => (
                            <div className="card w-full flex flex-col gap-2" key={userLink.id}>
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${userLink.link?.startsWith('http://') || userLink.link?.startsWith('https://')
                                        ? userLink.link
                                        : `https://${userLink.link}`
                                        }`}
                                    className="profil flex gap-2 items-center"
                                >
                                    <div className="profil w-[30px] overflow-hidden h-[30px] rounded-full">
                                        {/* Ganti gambar berdasarkan linkType */}
                                        {userLink.linkType === 'instagram' && (
                                            <Image
                                                src="https://img.freepik.com/free-vector/instagram-background-gradient-colors_23-2147823814.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728172800&semt=ais_hybrid"
                                                alt="Instagram logo"
                                                width={400}
                                                height={400}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {userLink.linkType === 'facebook' && (
                                            <Image
                                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                                alt="Facebook logo"
                                                width={400}
                                                height={400}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {/* Tambahkan gambar untuk linkType lain */}
                                        {userLink.linkType === 'twitter' && (
                                            <Image
                                                src="https://cdn.pixabay.com/photo/2017/08/23/11/30/twitter-2672572_1280.jpg"
                                                alt="Twitter logo"
                                                width={400}
                                                height={400}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {userLink.linkType === 'linkedin' && (
                                            <Image
                                                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                                alt="LinkedIn logo"
                                                width={400}
                                                height={400}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {userLink.linkType === 'portfolio' && (
                                            <Image
                                                src="https://cdn-icons-png.flaticon.com/512/5339/5339181.png"
                                                alt="Website logo"
                                                width={400}
                                                height={400}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="nama transition-all duration-150 hover:text-primary underline">
                                        {userLink.linkType.charAt(0).toUpperCase() + userLink.linkType.slice(1)}
                                    </div>
                                </Link>
                            </div>
                        ))}
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
            {/* Popup for updating the status */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleClosePopup} // Close popup on overlay click
                >
                    <div
                        className="bg-white p-4 rounded-lg relative max-w-[500px] mx-3 md:mx-0 w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                        >
                            &times;
                        </button>
                        <div>
                            <h2 className="font-semibold mb-5">Ubah Status</h2>
                            <CustomSelect
                                value={selectedValue}
                                options={statusOptions}
                                onChange={setSelectedValue}
                                placeholder="Pilih status"
                                label="Status Lowongan"
                                width="w-full"
                            />
                            <div className="flex justify-end mt-5">
                                <Button
                                    onClick={handleStatus}
                                    className="py-2 bg-primary text-white rounded-full w-[170px]"
                                    disabled={isLoading || !selectedValue} // Disable button if loading or no selection
                                >
                                    {isLoadingpop ? <Loading /> : <span className="text-sm">Perbarui status</span>} {/* Button text changes based on loading state */}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailLamaran