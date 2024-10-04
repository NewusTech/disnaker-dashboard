import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image"; // Make sure to import Image

interface DataTableProps {
    headers: string[];
    data: Array<{
        no: number;
        nama: string;
        nik: string;
        email: string;
        foto: string;
        status: string;
    }>;
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFoto, setSelectedFoto] = useState<string | null>(null);

    const handleOpenPopup = (foto: string) => {
        setSelectedFoto(foto);
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
        setSelectedFoto(null);
    };

    return (
        <div className="Table mt-3">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.no}>
                            <TableCell className="text-center">{user.no}</TableCell>
                            <TableCell>{user.nama}</TableCell>
                            <TableCell className="text-center">{user.nik}</TableCell>
                            <TableCell className="text-center">{user.email}</TableCell>
                            <TableCell className="text-center">
                                <button className="underline" onClick={() => handleOpenPopup(user.foto)}>
                                    Lihat Foto
                                </button>
                            </TableCell>
                            <TableCell className={`text-center font-medium ${user.status === "aktif" ? "text-green-500" : "text-red-500"}`}>
                                {user.status === "aktif" ? "Aktif" : "Tidak Aktif"}
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href="/masyarakat/akun-masyarakat/detail" className="p-2 px-6 bg-[#3D3D3D]/20 text-[#3D3D3D] rounded-full">
                                    Detail
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Popup for displaying the photo */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleClosePopup} // Close popup on overlay click
                >
                    <div
                        className="bg-white p-4 rounded-lg relative"
                        onClick={(e) => e.stopPropagation()} // Prevent click on inner box from closing the popup
                    >
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 flex justify-center items-center text-white w-6 h-6 rounded-full bg-primary"
                        >
                            x
                        </button>
                        {selectedFoto && (
                            <div className="w-[300px] h-[300px]">
                                <Image
                                    src={selectedFoto || "../../assets/images/galeri1.png"}
                                    alt="Foto User"
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={300}
                                    unoptimized
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default DataTable;
