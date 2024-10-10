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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import Loading from '../ui/Loading';
import UndangIcon from '../../../public/assets/icons/UndangIcon';

interface InvitePopupProps {
    onInvite: (selectedJobs: string[]) => Promise<void>;
    className?: string;
}

const InvitePopup: FC<InvitePopupProps> = ({ onInvite, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dummy data for jobs
    const jobs = [
        { label: 'UI/UX Designer', value: 'uiux' },
        { label: 'Backend Developer', value: 'backend' },
        { label: 'Frontend Developer', value: 'frontend' },
        { label: 'Project Manager', value: 'pm' },
    ];

    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    const handleCheckboxChange = (jobValue: string) => {
        setSelectedJob((prevSelectedJob) =>
            prevSelectedJob === jobValue ? null : jobValue
        );
    };

    const handleInvite = async () => {
        setLoading(true);
        try {
            if (selectedJob) {
                await onInvite([selectedJob]);
            }
        } catch (error) {
            console.error("Invite operation failed:", error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <div className='flex items-center w-full text-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className='w-full rounded-full bg-primary hover:bg-primary/80 flex items-center gap-2'>
                        <UndangIcon />
                        Undang Pelamar
                    </Button>
                </DialogTrigger>
                <DialogContent className='bg-white max-w-4xl'>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center text-lg font-normal mb-5">
                            Pilih Lowongan Pekerjaan
                        </DialogTitle>
                        <DialogDescription>
                            {jobs.map((job) => (
                                <div key={job.value} className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center justify-between w-full cursor-pointer">
                                            <span className="text-base hover:text-primary">{job.label}</span>
                                            <Checkbox
                                                checked={selectedJob === job.value}
                                                onCheckedChange={() => handleCheckboxChange(job.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="garis h-[1px] w-full my-3 bg-line-stroke"></div>
                                </div>
                            ))}
                            <div className="wrap flex gap-3 justify-end mt-3">
                                <Button
                                    className={`w-full rounded-full py-2 font-normal ${loading ? 'bg-gray-500' : 'bg-primary'}`}
                                    onClick={handleInvite}
                                    disabled={loading || !selectedJob}
                                >
                                    {loading ? <Loading /> : "Undang"}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InvitePopup;
