import { useQuery } from "@tanstack/react-query";

const getSamples = async (page: number, size: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/biosamples?page=${page}&size=${size}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("GET /samples");
  }

  return res.json();
};

export const useGetSamples = (page: number, size: number) => {
  return useQuery({
    queryKey: ["samples", page, size],
    queryFn: () => getSamples(page, size),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
