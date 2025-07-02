import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const addComment = async (sampleId: number, text: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/biosamples/${sampleId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }
  );
  if (!res.ok) throw new Error("Add comment failed");
  return res.json();
};

export const useAddComment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      addComment(id, text),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["sample", variables.id] });
    },
    onError: () => toast.error("Échec ajout commentaire"),
  });
};
