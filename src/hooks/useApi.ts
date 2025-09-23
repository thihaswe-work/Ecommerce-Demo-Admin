import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/api/client";
import { useError } from "@/context/errorContext";

interface UseApiOptions<T> {
  endpoint: string; // API path, e.g., '/users'
  fetchParams?: any; // optional params
  transform?: (data: any) => T[]; // optional transform
}

export const useApi = <T>({
  endpoint,
  fetchParams,
  transform,
}: UseApiOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const { setError } = useError(); // use global error
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(endpoint, { params: fetchParams });

      setData(transform ? transform(res.data) : res.data);
    } catch (err: any) {
      setError({
        status: err.response?.status || 500,
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }, [endpoint, fetchParams]);

  const removeItem = useCallback(
    async (id: string | number) => {
      // if (!confirm("Are you sure?")) return;
      try {
        await apiClient.delete(`${endpoint}/${id}`);
        setData((prev) => prev.filter((item: any) => item.id !== id));
      } catch (err: any) {
        setError({
          status: err.response?.status || 500,
          message: err.response?.data?.message || "Something went wrong",
        });
      }
    },
    [endpoint]
  );

  const createItem = useCallback(
    async (payload: Partial<T>) => {
      try {
        const res = await apiClient.post(endpoint, payload);
        setData((prev) => [...prev, res.data]);
        return res.data;
      } catch (err: any) {
        setError({
          status: err.response?.status || 500,
          message: err.response?.data?.message || "Something went wrong",
        });
      }
    },
    [endpoint]
  );

  const updateItem = useCallback(
    async (id: string | number, payload: Partial<T>) => {
      try {
        const res = await apiClient.put(`${endpoint}/${id}`, payload);
        setData((prev) =>
          prev.map((item: any) => (item.id === id ? res.data : item))
        );
        return res.data;
      } catch (err: any) {
        setError({
          status: err.response?.status || 500,
          message: err.response?.data?.message || "Something went wrong",
        });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    fetchData,
    removeItem,
    createItem,
    updateItem,
  };
};
