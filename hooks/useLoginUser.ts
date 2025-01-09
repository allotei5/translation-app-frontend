import api from "@/api";
import { useState } from "react";

interface LoginUserData {
    email: string;
    password: string;
  }

const useLoginUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const loginUser = async (userData: LoginUserData) :Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // make api call
      const response = await api.post("/auth/login", JSON.stringify(userData));
      setData(response.data);
      setSuccess(true);
    } catch (error: any) {
      if (error?.response.status === 422) {
        setError("Email and Password is required");
      } else if (error?.response.status === 403) {
        setError("Invalid email or password");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    loading,
    error,
    success,
    data
}
};

export default useLoginUser;

