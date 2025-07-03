import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import type { BioSampleUpdate } from "@/types/types";

export const updateSample = async (id: number, payload: BioSampleUpdate) => {
  const res = await fetch(`http://127.0.0.1:8000/biosamples/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const useUpdateSample = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateSample(id, data),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ["samples"] });
      qc.invalidateQueries({ queryKey: ["samples", id] });
    },
    onError: () => toast.error("La mise à jour a échoué"),
  });
};
