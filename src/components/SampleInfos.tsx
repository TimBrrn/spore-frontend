import type { SampleType } from "@/types/types";
import { CommentsTable } from "./CommentsTable";

export const SampleInfos = ({ sample }: { sample: SampleType }) => {
  return (
    <ul className="grid grid-cols-2 gap-y-3 text-base">
      <li>Date:</li>
      <li>
        {new Date(sample.sampling_date).toLocaleString("fr-FR", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </li>

      <li>Location:</li>
      <li>{sample.sampling_location}</li>

      <li>Type:</li>
      <li className="capitalize">{sample.sample_type}</li>

      <li>Operator:</li>
      <li>{sample.sampling_operator}</li>

      {sample.comments?.length ? (
        <div className="mt-4 space-y-3">
          <p>Comments ({sample.comments?.length})&nbsp;:</p>
          {sample.comments.length && (
            <CommentsTable comments={sample.comments} />
          )}
        </div>
      ) : (
        <p className="italic text-sm text-gray-500 mt-4">No comment.</p>
      )}
    </ul>
  );
};
