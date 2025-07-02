import { useQuery } from "@tanstack/react-query";

const getSampleById = async (id: string | undefined) => {
  const res = await fetch(`http://127.0.0.1:8000/biosamples/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`GET /sample/${id}`);
  }

  return res.json();
};

export const useGetSampleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["sample", id],
    queryFn: () => getSampleById(id),
    enabled: Boolean(id),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
