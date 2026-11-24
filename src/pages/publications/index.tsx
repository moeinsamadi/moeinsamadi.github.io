import { IoLibrary } from "react-icons/io5";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageTitle } from "@/hooks/use-pagetitle";

import { PublicationEntry } from "@/components/publication-entry";
import { publications } from "@/data/publications";

export default function PublicationsPage() {
  usePageTitle("Publications");

  return (
    <div className="flex flex-1 flex-col items-center gap-10">
      <div className="w-full max-w-6xl">
        <div className="flex flex-row justify-center items-center gap-4 text-4xl font-semibold">
          <IoLibrary />
          Publications
        </div>

        <div className="w-full px-2 sm:px-6 overflow-hidden mt-10">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[calc(100%-50px)]">
                  Publication
                </TableHead>
                <TableHead className="w-[46px] text-right">Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.items.map((pub, index) => (
                <TableRow key={index} className="transition-none">
                  <TableCell className="whitespace-normal space-y-1">
                    <PublicationEntry pub={pub} />
                  </TableCell>

                  <TableCell className="text-sm text-right text-muted-foreground">
                    {pub.year}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
