import { SERVER_URL } from "@/constants";
import { fetcherWithoutAuth } from "@/constants/fetcher";

export type pupukProps = {
  id: number;
  tahun: number;
  jenisPupuk: string;
  kandunganPupuk: string;
  keterangan: string;
  hargaPupuk: number;
};
export async function pupukDataQuery(search?: string) {
  const response = await fetcherWithoutAuth(`${SERVER_URL}/psp/pupuk/get?search=${search ?? ""}`);
  return response.data.data;
}
