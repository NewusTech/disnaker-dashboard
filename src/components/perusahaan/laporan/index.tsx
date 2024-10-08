import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";

interface DataTableProps {
    headers: string[];
    data: Array<{
        no: number;
        lowongan: string;
        kategori: string;
        telahDilamar: number;
        wawancara: number;
        test: number;
        diterima: number;
        ditolak: number;
        totalPelamar: number;
    }>;
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {

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
                            <TableCell>{user.lowongan}</TableCell>
                            <TableCell className="text-center">{user.kategori}</TableCell>
                            <TableCell className="text-center">{user.telahDilamar}</TableCell>
                            <TableCell className="text-center">{user.wawancara}</TableCell>
                            <TableCell className="text-center">{user.test}</TableCell>
                            <TableCell className="text-center">{user.diterima}</TableCell>
                            <TableCell className="text-center">{user.ditolak}</TableCell>
                            <TableCell className="text-center">{user.totalPelamar}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
