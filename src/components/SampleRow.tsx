import { useNavigate } from "react-router";

import { TableCell, TableRow } from "./ui/table";
import { cn } from "@/lib/utils";
import type { SampleType } from "@/types/types";

interface SampleRowProps {
  sample: SampleType;
}

export const SampleRow: React.FC<SampleRowProps> = ({ sample }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/sample/${sample.id}`);
  };

  return (
    <TableRow
      onClick={handleNavigate}
      className={cn(
        "transition-transform duration-200 hover:scale-101",
        "font-sintony text-lg cursor-pointer"
      )}
    >
      <TableCell>{sample.id}</TableCell>
      <TableCell>{sample.sampling_location}</TableCell>
      <TableCell>{sample.sample_type}</TableCell>
      <TableCell>{sample.sampling_date}</TableCell>
    </TableRow>
  );
};
