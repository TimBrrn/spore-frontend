import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteSample = async (id: string) => {
  const res = await fetch(`http://127.0.0.1:8000/biosamples/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("GET /samples");
  }

  return res.json();
};

export const useDeleteSample = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSample(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["samples"] });
    },
  });
};
