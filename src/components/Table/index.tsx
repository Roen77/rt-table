import React, { useCallback } from "react";
import * as XLSX from "xlsx";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ExcellentExport from "excellentexport";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "visits",
    header: "번호",
  },
  {
    accessorKey: "firstName",
    header: "Info",
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
      },
      {
        accessorKey: "progress",
        header: "More Info",
      },
    ],
  },
];

function Table() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const xport = useCallback(async () => {
    /* Create worksheet from HTML DOM TABLE */
    const table = document.getElementById("testt");
    const wb = XLSX.utils.table_to_book(table);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
  }, []);
  const onClickTest = () => {
    return ExcellentExport.convert(
      { anchor: "aaㅁㅁ", filename: "data_123.array", format: "xlsx" },
      [{ name: "Sheet Name Here 1", from: { table: "testt" } }]
    );
  };

  return (
    <div className="p-2">
      <table id="testt">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            console.log("ddd", table.getHeaderGroups());
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      <button onClick={xport}>
        <b>Export XLSX!</b>
      </button>
    </div>
  );
}

export default Table;
