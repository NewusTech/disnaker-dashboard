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
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import { Textarea } from '@/components/ui/textarea';

interface TolakPengaduanProps {
    onTolak: (payload: { status: string; keterangan: string; }) => Promise<void>; // API function
}

const TolakPengaduan: FC<TolakPengaduanProps> = ({ onTolak }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alasan, setAlasan] = useState('');

    const handleReject = async () => {
        setLoading(true);
        const payload = {
            status: 'Ditutup',
            keterangan: alasan, // alasan penolakan dari user
        };

        try {
            await onTolak(payload); // Mengirim payload ke API
            setAlasan(''); // Reset alasan setelah berhasil
        } catch (error) {
            console.error("Terima gagal:", error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <div className='flex'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsOpen(true)} className="rounded-full w-[200px] bg-error hover:bg-error/80">
                        Ditutup
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-start'>
                            Berikan Catatan
                        </DialogTitle>
                        <DialogDescription className='text-start'>
                        Dengan menolak pengaduan ini, Anda mengonfirmasi bahwa pengaduan tersebut tidak akan diproses lebih lanjut. Pengaduan akan berstatus ditolak, dan pelapor akan diberitahukan mengenai keputusan ini
                            <Textarea
                                className='placeholder:text-[#3D3D3DB2]/70 h-[150px] mt-2 p-3'
                                placeholder="Silahkan masukan catatan untuk pengadu"
                                value={alasan}
                                onChange={(e) => setAlasan(e.target.value)}
                            />
                            <div className="wrap flex gap-3 justify-end mt-3">
                                <Button
                                    type='button'
                                    variant="outlinePrimary"
                                    className='w-[100px] rounded-full text-primary'
                                    onClick={() => setIsOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    className={`px-5 rounded-full ${loading ? 'bg-gray-500' : 'bg-primary hover:bg-primary/80'}`}
                                    onClick={handleReject}
                                    disabled={loading || !alasan} // Disable button if loading or no reason provided
                                >
                                    {loading ? <Loading /> : "Kirim Catatan"}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TolakPengaduan;
