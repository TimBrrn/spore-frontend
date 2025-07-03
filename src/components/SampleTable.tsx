import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { SampleRow } from "./SampleRow";
import type { Sample } from "@/types/types";

interface SampleTableProps {
  samples: Sample[];
}

export const SampleTable: React.FC<SampleTableProps> = ({ samples }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] text-2xl">ID</TableHead>
        <TableHead className="text-2xl">Location</TableHead>
        <TableHead className="text-2xl">Type</TableHead>
        <TableHead className="text-2xl">Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {samples.map((sample) => (
        <SampleRow key={sample.id} sample={sample} />
      ))}
    </TableBody>
  </Table>
);
