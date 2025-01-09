import api from "@/api";
import { useState } from "react";

interface TranscriptData {
    firstLanguage: string | null,
    secondLanguage: string | null
}

const useCreateTranscript = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const createTranscript = async (transcriptData: TranscriptData): Promise<void> => {
    try {
        // make api call
        const response = await api.post("/transcript", JSON.stringify(transcriptData))
        setData(response.data);
        setSuccess(true)
        // console.log(response)
    } catch (error: any) {
        // console.log(error)
        if (error?.response.status === 422) {
            setError(error?.data?.details[0].message)
        } else {
            setError("An unexpected error occured")
        }
    } finally {
        setLoading(false)
    }
  };

  return { createTranscript, loading, serverror: error, success, data };
};

export default useCreateTranscript;