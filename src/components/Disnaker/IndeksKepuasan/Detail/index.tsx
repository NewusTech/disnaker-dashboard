"use client"

// Define the structure of the data props
interface IndeksProps {
    data: {
        nama: string;
        jawaban1: string;
        jawaban2: string;
        jawaban3: string;
        jawaban4: string;
        jawaban5: string;
        jawaban6: string;
        kritikSaran: string;
    };
}

interface ProfileInfo {
    label: string;
    value: string;
}

const ProfileDetail: React.FC<ProfileInfo> = ({ label, value }) => (
    <div className="left w-1/2">
        <div className="label text-[#3572EF]">{label}</div>
        <div className="teks text-sm">{value}</div>
    </div>
);

const Indeks: React.FC<IndeksProps> = ({ data }) => {

    return (
        <div>
            {/* Detail */}
            <div className="status py-2 rounded-full w-full text-primary bg-primary/20 text-center mb-4">
                {data.nama}
            </div>
            <div className="wrap-all flex flex-col gap-6">
                {/* Profile Kependudukan */}
                <div className="wrap flex flex-col gap-4">
                    <div className="konten flex flex-col gap-4">
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jawaban 1" value={data.jawaban1} />
                            <ProfileDetail label="Jawaban 2" value={data.jawaban2} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jawaban 3" value={data.jawaban3} />
                            <ProfileDetail label="Jawaban 4" value={data.jawaban4} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <ProfileDetail label="Jawaban 5" value={data.jawaban5} />
                            <ProfileDetail label="Jawaban 6" value={data.jawaban6} />
                        </div>
                        <div className="wrap flex gap-1 px-1">
                            <div className="left w-full">
                                <div className="label text-[#3572EF]">Kritik dan Saran</div>
                                <div className="teks text-sm">{data.kritikSaran}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detail */}


        </div>
    );
};

export default Indeks;
