// api/index.ts
import useSWR from 'swr';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useLocalStorage from '@/hooks/useLocalStorage';

export type PupukProps = {
  id: number;
  tahun: number;
  jenisPupuk: string;
  kandunganPupuk: string;
  keterangan: string;
  hargaPupuk: number;
};

const useGetPupukData = (currentPage: number, search: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/psp/pupuk/get?page=${currentPage}&search=${search}&limit=10`,
    () =>
      axiosPrivate
        .get(`/psp/pupuk/get?page=${currentPage}&search=${search}&limit=10`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data.data) // Diasumsikan data yang dibutuhkan ada di `res.data.data`
  );

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

export default useGetPupukData;
