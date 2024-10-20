import React, { useState } from 'react'
import { Input } from '@/components/ui/input';

const Report = () => {
    // State untuk menyimpan nilai yang dipilih
    const [selectedFilter, setSelectedFilter] = useState<string>('Hari');

    // date
    const formatDateToDDMMYYYY = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero if needed
        const year = date.getFullYear(); // Get full year

        return `${day}/${month}/${year}`; // Return formatted date
    };

    // Fungsi untuk menangani klik tombol
    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        console.log(filter); // Log nilai yang dipilih ke console
    };

    return (
        <div>
            <div className="filter justify-end flex items-center gap-3">
                <div className="date flex items-center gap-3">
                    <Input
                        type='date'
                        placeholder='Tanggal Awal'
                    />
                    <div className="">to</div>
                    <Input
                        type='date'
                        placeholder='Tanggal Akhir'
                    />
                </div>
                <div className="text-base md:text-lg flex gap-2 bg-[#EEEEEE] w-fit p-2  rounded-full">
                    {['Hari', 'Bulan', 'Tahun'].map((filter) => (
                        <button
                            key={filter}
                            className={`text-sm ${selectedFilter === filter ? 'aktif text-white bg-primary p-2 rounded-full w-[100px]' : 'w-[100px] text-black/70'}`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Report