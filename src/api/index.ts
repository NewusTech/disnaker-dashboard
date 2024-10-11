// api/index.ts
import useSWR from 'swr';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLocalStorage from '@/hooks/useLocalStorage';

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

// Define types for Kabupaten
export type KabupatenProps = {
  status: number; 
  message: string; 
  data: {
      id: number; 
      provinsi_id: number; 
      name: string; 
      createdAt: string; 
      updatedAt: string; 
  }[]; 
  pagination: {
      page: number; 
      perPage: number; 
      totalPages: number; 
      totalCount: number; 
  };
};


// Hook to fetch Kabupaten data
const useGetKabupaten = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage('accessToken', '');
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
  const [accessToken] = useLocalStorage('accessToken', '');
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
  const [accessToken] = useLocalStorage('accessToken', '');
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
  const [accessToken] = useLocalStorage('accessToken', '');
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
  const [accessToken] = useLocalStorage('accessToken', '');
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/skill/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(`/skill/get`, {
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

export { useGetPupukData, useGetKabupaten, useGetProvinsi, useGetKecamatan, useGetKelurahan, useGetSkill };
