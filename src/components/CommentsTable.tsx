import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type { CommentType } from "@/types/types";

type CommentsTableProps = {
  comments: CommentType[];
};

export const CommentsTable: React.FC<CommentsTableProps> = ({ comments }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[160px]">Date&nbsp;</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {comments.map((c) => (
        <TableRow key={c.id}>
          <TableCell className="text-xs text-muted-foreground">
            {new Date(c.created_at).toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </TableCell>
          <TableCell>{c.text}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
