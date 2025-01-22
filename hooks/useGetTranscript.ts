import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { Transcript } from "./useGetTranscripts";

const getUserTranscript = async (id: string): Promise<Transcript> => {
  const response = await api.get(`/transcript/${id}`);
  return response.data as Transcript;
};

const useGetTranscript = (id: string) => {
  return useQuery({
    queryKey: ["transcript", id],
    queryFn: () => getUserTranscript(id),
    retry: 2,
  });
};

export default useGetTranscript;