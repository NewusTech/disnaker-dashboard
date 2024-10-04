"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { pupukDataQuery, pupukProps } from "@/api";

const DashboardPage = () => {
  const [pupukData, setPupukData] = useState<pupukProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    pupukDataQuery(searchQuery)
      .then(setPupukData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=" w-full ">
      <div className="w-[70%] mx-auto bg-white p-4">
        <div className="mb-2">
          <input
            placeholder="Cari Pupuk"
            className="p-2 border w-full border-blue-500 rounded-xl"
            type="text"
            value={searchQuery} // Bind the input value to searchQuery state
            onChange={handleSearchChange} // Update search query on input change
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Jenis Pupuk</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead className="text-right">Harga Pupuk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : pupukData.length ? (
              pupukData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.tahun}</TableCell>
                  <TableCell>{item.jenisPupuk}</TableCell>
                  <TableCell>{item.keterangan}</TableCell>
                  <TableCell className="text-right">{item.hargaPupuk}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
