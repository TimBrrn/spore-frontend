import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import type { CreateSamplePayload } from "@/types/types";

export const createSample = async (payload: CreateSamplePayload) => {
  const res = await fetch("http://127.0.0.1:8000/biosamples", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("POST /biosamples failed");
  return res.json();
};

export const useCreateSample = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createSample,
    onSuccess: () => {
      toast.success("Sample added!");
      queryClient.invalidateQueries({ queryKey: ["samples"] });
      navigate("/");
    },
    onError: () => toast.error("Sample creation failed!"),
  });
};
