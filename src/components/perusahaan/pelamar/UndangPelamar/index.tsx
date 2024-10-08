import React from "react";
import PendidikanDetail from "../../../../../public/assets/icons/PendidikanDetail";
import PengalamanDetail from "../../../../../public/assets/icons/PengalamanDetail";
import InfoDetail from "../../../../../public/assets/icons/InfoDetail";
import Link from "next/link";

interface ApplicantData {
    name: string;
    education: string;
    experience: string;
    status: string;
    description: string;
    skills: string[];
}

interface DataTableProps {
    headers: string[];
    data: ApplicantData[];
}

const DataTable: React.FC<DataTableProps> = ({ headers, data }) => {
    return (
        <div className="wrap-card grid grid-cols-1 gap-7 mt-7 md:grid-cols-2">
            {data.map((applicant, index) => (
                <div
                    key={index}
                    className="card p-5 flex flex-col justify-between gap-4 bg-white border border-line-stroke rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                    {/* atas */}
                    <div className="atas flex flex-col gap-4">
                    <div className="nama text-2xl font-semibold">{applicant.name}</div>
                    <div className="detail flex items-center gap-4">
                        <div className="flex gap-1 items-center font-medium">
                            <PendidikanDetail />
                            {applicant.education}
                        </div>
                        <div className="flex gap-1 items-center font-medium">
                            <PengalamanDetail />
                            {applicant.experience}
                        </div>
                        <div className="flex gap-1 items-center font-medium">
                            <InfoDetail />
                            {applicant.status}
                        </div>
                    </div>
                    <div className="desk text-justify line-clamp-3">
                        {applicant.description}
                    </div>
                    {/* Skills */}
                    <div className="flex flex-col gap-1">
                        <div className="wrap-card flex flex-wrap gap-3">
                            {applicant.skills.map((skill, skillIndex) => (
                                <div
                                    key={skillIndex}
                                    className="card flex-shrink-0 p-2 rounded-md border border-[#C7C7CD] transition ease-in-out delay-150 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                    {/* atas */}
                    <div className="bawah flex flex-col gap-4">
                        <div className="ga h-[1px] w-full bg-line-stroke"></div>
                        {/* Link to detail */}
                        <Link
                            href="/pelamar/undang-pelamar/detail"
                            className="bg-primary py-3 w-full rounded-full text-center text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-primary/80"
                        >
                            Detail Pelamar
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DataTable;
