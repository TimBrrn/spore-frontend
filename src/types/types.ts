import z from "zod";

export type Sample = {
  id: number;
  sampling_location: string;
  sample_type: "water" | "chocolate" | "flour" | string;
  sampling_operator: string;
  sampling_date: string;
  comment?: string;
};

export type CreateSamplePayload = {
  sampling_location: string;
  sample_type: string;
  sampling_operator: string;
  sampling_date: string;
  comment?: string[];
};

const isoDate = z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
  message: "Adjust format",
});

export const AddSampleFormSchema = z.object({
  sampling_location: z.string().nonempty({ message: "Location is required" }),
  sample_type: z.union([
    z.enum(["water", "chocolate", "flour"]),
    z.string().min(1, { message: "Type is required" }),
  ]),
  sampling_operator: z.string().nonempty({ message: "Operator is required" }),
  sampling_date: isoDate,
});

export type AddSampleFormType = z.infer<typeof AddSampleFormSchema>;

export const BioSampleUpdateSchema = z.object({
  sampling_location: z.string().optional(),
  sample_type: z.string().optional(),
  sampling_operator: z.string().optional(),
  sampling_date: z.string().optional(),
  new_comment: z.string().optional(),
});

export type BioSampleUpdate = z.infer<typeof BioSampleUpdateSchema>;
