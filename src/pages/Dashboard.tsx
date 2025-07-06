import { useState } from "react";

import Layout from "@/layout/Layout";
import { useGetSamples } from "@/hooks/useGetSamples";
import { Hero } from "@/components/Hero";
import Loader from "@/components/Loader";
import { SampleTable } from "@/components/SampleTable";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 6;

export const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetSamples(page, PAGE_SIZE);

  const hasNext = data?.length === PAGE_SIZE;

  return (
    <Layout>
      <Hero />
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <SampleTable samples={data} />

          <div className="flex justify-center gap-6 mt-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Back
            </Button>
            <span className="self-center font-sintony">Page {page}</span>
            <Button
              variant="outline"
              disabled={!hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};
