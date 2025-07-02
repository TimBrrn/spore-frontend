import { useNavigate, useParams } from "react-router";
import { ArrowBigLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/layout/Layout";
import Loader from "@/components/Loader";
import { EditSampleModal } from "@/components/UpdateSamleModal";
import { CommentsTable } from "@/components/CommentsTable";
import { useGetSampleById } from "@/hooks/useGetSampleById";
import { useDeleteSample } from "@/hooks/useDeleteSample";

export const SampleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: sample, isFetching } = useGetSampleById(id);
  const deleteSample = useDeleteSample();

  const handleDelete = async () => {
    if (!id) return;
    await deleteSample.mutateAsync(id);
    toast.success(`BioSample°${id} deleted!`);
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Layout>
      {isFetching ? (
        <Loader />
      ) : (
        <Card className="shadow-lg min-w-xl space-y-4">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">{id}</CardTitle>
              <CardDescription>Sample Details</CardDescription>
            </div>
            <Button
              variant="destructive"
              className="rounded btn-animate"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardHeader>

          <CardContent>
            <ul className="grid grid-cols-2 gap-y-3 text-base">
              <li className="font-medium">Date:</li>
              <li>
                {new Date(sample.sampling_date).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </li>

              <li className="font-medium">Location:</li>
              <li>{sample.sampling_location}</li>

              <li className="font-medium">Type:</li>
              <li className="capitalize">{sample.sample_type}</li>

              <li className="font-medium">Operator:</li>
              <li>{sample.sampling_operator}</li>

              {sample.comments?.length ? (
                <div className="mt-4 space-y-3">
                  <p className="font-medium">
                    Comments ({sample.comments?.length})&nbsp;:
                  </p>
                  {sample.comments.length && (
                    <CommentsTable comments={sample.comments} />
                  )}
                </div>
              ) : (
                <p className="italic text-sm text-gray-500 mt-4">No comment.</p>
              )}
            </ul>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <EditSampleModal sample={sample} />
            <Button
              className="rounded btn-animate"
              variant="outline"
              onClick={handleBack}
            >
              <ArrowBigLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
};
