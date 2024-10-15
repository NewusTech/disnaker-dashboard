import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
} from "@/components/ui/table";

interface LaporanResponse {
    headers: string[];
    data: Laporan[];
    currentPage: number;
    search: string;
    status: string;
}

interface Laporan {
    id: number;
    title: string;
    category: string;
    companyName: string;
    appliedCount: number;
    interviewCount: number;
    testCount: number;
    acceptCount: number;
    rejectCount: number;
    applicationCount: number;
}


const DataTable: React.FC<LaporanResponse> = ({ headers, data, currentPage, search, status }) => {

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
                    {data?.length > 0 ? (
                        data.map((user, index) => (
                            <TableRow key={user?.id}>
                                <TableCell className="text-center">
                                    {(currentPage - 1) * 10 + (index + 1)}
                                </TableCell>
                                <TableCell>{user?.companyName ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.title ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.category ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.appliedCount ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.interviewCount ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.testCount ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.acceptCount ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.rejectCount ?? "-"}</TableCell>
                                <TableCell className="text-center">{user?.applicationCount ?? "-"}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center">Tidak ada data</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
