// api/index.ts
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";

// Define types for Pupuk
export type PupukProps = {
  id: number;
  tahun: number;
  jenisPupuk: string;
  kandunganPupuk: string;
  keterangan: string;
  hargaPupuk: number;
};

// Hook to fetch Pupuk data
const useGetPupukData = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/psp/pupuk/get?page=${currentPage}&search=${search}&limit=10`,
    () =>
      axiosPrivate
        .get(`/psp/pupuk/get`, {
          params: {
            page: currentPage,
            search: search,
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data.data) // Assuming the required data is in `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Kabupaten data
const useGetKabupaten = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/region/kabupaten/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/region/kabupaten/get`, {
          params: {
            page: currentPage,
            limit: 10,
            search,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Assuming data is in `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Provinsi data
const useGetProvinsi = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/region/provinsi/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/region/provinsi/get`, {
          params: {
            page: currentPage,
            limit: 10,
            search,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Assuming data is in `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Kecamatan data
const useGetKecamatan = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/region/kecamatan/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/region/kecamatan/get`, {
          params: {
            page: currentPage,
            limit: 10,
            search,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Assuming data is in `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Kelurahan data
const useGetKelurahan = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/region/kelurahan/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/region/kelurahan/get`, {
          params: {
            page: currentPage,
            limit: 10,
            search,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Assuming data is in `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Skill data
const useGetSkill = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/skill/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/skill/get?page=${currentPage}&limit=10&search=${search}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Kategori data
const useGetKategori = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/vacancy/category/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/vacancy/category/get?page=${currentPage}&limit=10&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch LowonganDisnaker data
const useGetLowonganDisnaker = (
  currentPage: number,
  search: string,
  statusLowongan: string
) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/vacancy/get?page=${currentPage}&limit=10&search=${search}&status=${statusLowongan}`,
    () =>
      axiosPrivate
        .get(
          `/vacancy/get?page=${currentPage}&limit=10&search=${search}&status=${statusLowongan}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch LowonganGetSlug data
interface VacancyResponse {
  status: number;
  message: string;
  data: VacancyData;
}

interface VacancyData {
  id: number;
  category_id: number;
  company_id: number;
  title: string;
  slug: string;
  desc: string;
  responsibility: string;
  requirement: string;
  location: string | null;
  gender: string;
  minExperience: number;
  maxAge: number;
  workingDay: string;
  workingHour: string;
  jobType: string;
  workLocation: string;
  isPublished: string;
  applicationDeadline: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
  Company: CompanyData;
  VacancyCategory: VacancyCategoryData;
  EducationLevels: EducationLevel[];
  Skills: Skills[];
}

interface CompanyData {
  id: number;
  name: string;
  imageLogo: string;
  imageBanner: string;
  desc: string;
  address: string;
  numberEmployee: number;
  website: string;
  instagram: string;
}

interface VacancyCategoryData {
  id: number;
  name: string;
}

interface EducationLevel {
  id: number;
  level: string;
  createdAt: string;
  updatedAt: string;
  VacancyEducationLevel: VacancyEducationLevel;
}

interface VacancyEducationLevel {
  vacancy_id: number;
  educationLevel_id: number;
  createdAt: string;
  updatedAt: string;
}

interface Skills {
  id: number;
  name: string;
}

interface SkillData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const useGetLowonganGetSlug = (slug: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<VacancyResponse>(
      `/vacancy/get/${slug}`,
      () =>
        axiosPrivate
          .get(`/vacancy/get/${slug}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

const useGetUserAll = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/users/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/users/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Instansi
const useGetInstansiAll = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/companies/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/companies/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Kategori Filter data
const useGetKategoriFilter = () => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/vacancy/category/get?limit=9999`,
    () =>
      axiosPrivate
        .get(
          `/vacancy/category/get?limit=9999`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Skill Filter data
interface Skill {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetSkillResponse {
  status: number;
  message: string;
  data: Skill[];
}

const useGetSkillFilter = () => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<GetSkillResponse>(
    `/skill/get?limit=1000`,
    () =>
      axiosPrivate
        .get(`/skill/get?limit=1000`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Pendidikan Filter data
interface EducationLevel {
  id: number;
  level: string;
}

interface GetEducationLevelResponse {
  status: number;
  message: string;
  data: EducationLevel[];
}

const useGetPendidikanFilter = () => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<GetEducationLevelResponse>(
    `/education-level/get?limit=1000`,
    () =>
      axiosPrivate
        .get(`/education-level/get?limit=1000`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Pelatihan
const useGetPelatihan = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/training/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/training/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// get id pelatihan
const useGetPelatihanGetId = (id: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR(
      `/training/get/${id}`,
      () =>
        axiosPrivate
          .get(`/training/get/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Sertifikasi
const useGetSertifikasi = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/certification/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/certification/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// get id sertifikasi
const useGetSertifikasiGetId = (id: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR(
      `/certification/get/${id}`,
      () =>
        axiosPrivate
          .get(`/certification/get/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Konsultasi
const useGetKonsultasi = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/consultation/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/consultation/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// get id konsultasi
const useGetKonsultasiGetId = (id: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR(
      `/consultation/get/${id}`,
      () =>
        axiosPrivate
          .get(`/consultation/get/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch Event
const useGetEvent = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/event/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/event/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// get id konsultasi
const useGetEventGetId = (slug: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR(
      `/event/get/${slug}`,
      () =>
        axiosPrivate
          .get(`/event/get/${slug}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch LaporanDisnaker
const useGetLaporanDisnaker = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/report/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/report/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// Hook to fetch LamaranDisnaker
const useGetLamaranDisnaker = (currentPage: number, search: string, status: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/application/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
    () =>
      axiosPrivate
        .get(
          `/application/get?page=${currentPage}&limit=10&search=${search}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

export {
  useGetLamaranDisnaker,
  useGetLaporanDisnaker,
  useGetEventGetId,
  useGetEvent,
  useGetKonsultasiGetId,
  useGetKonsultasi,
  useGetSertifikasiGetId,
  useGetSertifikasi,
  useGetPelatihanGetId,
  useGetPelatihan,
  useGetPendidikanFilter,
  useGetSkillFilter,
  useGetKategoriFilter,
  useGetInstansiAll,
  useGetUserAll,
  useGetPupukData,
  useGetKabupaten,
  useGetProvinsi,
  useGetKecamatan,
  useGetKelurahan,
  useGetSkill,
  useGetKategori,
  useGetLowonganDisnaker,
  useGetLowonganGetSlug,
};
