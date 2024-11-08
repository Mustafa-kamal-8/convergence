import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface FilePreviewProps {
  data: any;
  processing?: boolean;
}

export default function FilePreview({ data, processing }: FilePreviewProps) {
  if (processing) {
    return (
      <div className="flex items-center justify-center h-56 w-full">
        <LoaderIcon className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    data.length > 0 && (
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map((key) => {
              return (
                <TableHead key={key} className="p-2 text-left border-r">
                  {key}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row: string, index: number) => (
            <TableRow key={index} className="text-left">
              {Object.values(row).map((value, index) => (
                <TableCell key={index} className="border-r">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
