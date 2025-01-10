import { useQuery } from "@tanstack/react-query";
import api from "@/api";

// type for a transcript
export interface Transcript {
  _id: string;
  firstLanguage: string;
  firstLanguageCode: string;
  secondLanguageCode: string;
  secondLanguage: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const getUserTranscripts = async () :Promise<Transcript[]> => {
    const response = await api.get("/transcripts")
    return response.data as Transcript[];
}

// Custom hook for fetching transcripts
const useGetTranscripts = () => {
  return useQuery({
    queryKey: ["transcripts"],
    queryFn: getUserTranscripts,
    retry: 2,
  })
};

export default useGetTranscripts;