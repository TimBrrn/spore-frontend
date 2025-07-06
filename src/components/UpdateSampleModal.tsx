import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateSample } from "@/hooks/useUpdateSample";
import { useAddComment } from "@/hooks/useAddComment";
import {
  BioSampleUpdateSchema,
  type BioSampleUpdate,
  type SampleType,
} from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = { sample: SampleType };

export const EditSampleModal: React.FC<Props> = ({ sample }) => {
  const navigate = useNavigate();
  const { mutateAsync: updateSample } = useUpdateSample();
  const { mutateAsync: addComment } = useAddComment();

  const form = useForm<BioSampleUpdate>({
    resolver: zodResolver(BioSampleUpdateSchema),
    defaultValues: {
      sampling_location: sample.sampling_location,
      sample_type: sample.sample_type,
      sampling_operator: sample.sampling_operator,
      sampling_date: sample.sampling_date,
      new_comment: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { new_comment, ...sampleFields } = data;

    // Update sample if one field has changed
    if (Object.values(sampleFields).some((v) => v !== undefined && v !== "")) {
      await updateSample({ id: sample.id, data: sampleFields });
    }

    // Add comment
    if (new_comment?.trim()) {
      await addComment({ id: sample.id, text: new_comment.trim() });
    }

    toast.success("Mise à jour effectuée");
    navigate(0);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="btn-animate">
          <Pencil className="mr-2 h-4 w-4" /> Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier l'échantillon #{sample.id}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {/** chaque champ **/}
            <FormField
              control={form.control}
              name="sampling_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sample_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampling_operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampling_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add a new comment</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full btn-animate"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Enregistrement…" : "Enregistrer"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
