"use client";
import React, { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
// import HapusIcon from '../../../../public/icons/HapusIcon';
import { Button } from '@/components/ui/button';
import Loading from '../ui/Loading';

interface PengaduanPopupProps {
    onAksi: () => Promise<void>; // onAksi should return a promise
    className?: string;
    title?: string;
    nama?: string;
    deskripsi?: string;
}

const PengaduanPopup: FC<PengaduanPopupProps> = ({ onAksi, className, title, deskripsi, nama }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true); // Set loading to true when starting the delete operation
        try {
            await onAksi(); // Wait for the delete action to complete
        } catch (error) {
            console.error("Delete operation failed:", error);
        } finally {
            setLoading(false); // Set loading to false once the operation is complete
            setIsOpen(false); // Close the dialog
        }
    };

    return (
        <div title='Hapus' className='flex items-center w-full text-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className={`${className}`}>{nama}</Button>
                </DialogTrigger>
                <DialogContent className='bg-white max-w-xl'>
                    <DialogHeader>
                        <DialogTitle className='text-start mt-3'>
                            {title}
                        </DialogTitle>
                        <DialogDescription className='text-start'>
                            {deskripsi}
                            <div className="wrap flex gap-3 justify-end mt-3">
                                <Button
                                    type='button'
                                    variant="outlinePrimary"
                                    className='w-[100px] rounded-full py-2'
                                    onClick={() => setIsOpen(false)} // Menutup dialog
                                >
                                    Batal
                                </Button>
                                <Button
                                    className={`w-[100px] rounded-full py-2 ${loading ? 'bg-gray-500' : 'bg-primary'}`}
                                    onClick={handleDelete} // Menambahkan fungsi onClick
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? <Loading /> : `${nama}`}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PengaduanPopup;
