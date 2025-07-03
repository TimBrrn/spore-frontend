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
import { useGetSampleById } from "@/hooks/useGetSampleById";
import { useDeleteSample } from "@/hooks/useDeleteSample";
import { SampleInfos } from "@/components/SampleInfos";

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
        <Card className="shadow-lg min-w-xl space-y-4 font-sintony">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">{id}</CardTitle>
              <CardDescription>Sample Details</CardDescription>
            </div>
            <Button
              variant="destructive"
              className="rounded btn-animate text-md p-7"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </CardHeader>

          <CardContent>
            <SampleInfos sample={sample} />
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
