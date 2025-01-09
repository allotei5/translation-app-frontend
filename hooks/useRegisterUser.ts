import api from "@/api";
import { useState } from "react";

const useRegisterUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const registerUser = async (userData: any): Promise<void> => {
    setLoading(true);
    setError(null); // Clear any previous error
    setSuccess(false); // Reset success state
    try {
        
      // Make the API call
      const response = await api.post("/auth/register", JSON.stringify(userData));
      setData(response.data); // Save response data
      setSuccess(true); // Indicate success
    } catch (error: any) {
      // Handle known and unknown errors
    //   console.error(error)
      if (error?.response?.status === 400) {
        setError("User already exists.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Always stop loading state
    }
  };

  return {
    registerUser,
    loading,
    error,
    success,
    data,
  };
};

export default useRegisterUser;
