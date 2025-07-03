import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCreateSample } from "@/hooks/useCreateSample";
import type { AddSampleFormType } from "@/types/types";

export const AddSampleModal = () => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createSample } = useCreateSample();

  const form = useForm<AddSampleFormType>({
    defaultValues: {
      sampling_location: "",
      sample_type: "",
      sampling_operator: "",
      sampling_date: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const payload = {
      sampling_location: data.sampling_location,
      sample_type: data.sample_type,
      sampling_operator: data.sampling_operator,
      sampling_date: data.sampling_date,
    };

    await createSample(payload);
    form.reset();
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="min-w-40 min-h-14 btn-animate text-md"
        >
          Add Sample
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New sample</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="sampling_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="water / chocolate / flour" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="Operator" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-15">
              <Button
                type="submit"
                className="w-1/4 btn-animate"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving…" : "Add Sample"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
