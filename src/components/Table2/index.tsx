import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
  useReactTable,
} from "@tanstack/react-table";
import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
type Member = {
  number: { id: string; span: number };
  grade: string;
  register: string;
  name: string;
  sex: string;
  birth: string;
  rank: string;
  group: string;
  si: string;
  gun: string;
};

const span = {
  number: {
    rowSpan: 2,
  },
  grade: {
    rowSpan: 2,
  },
  register: {
    rowSpan: 2,
  },
  name: {
    rowSpan: 2,
  },
  sex: {},
  birth: {},
  rank: {},
  group: {},
  si: {},
  gun: {},
};

const defaultData: Member[] = [
  {
    number: {
      id: "hhh",
      span: 2,
    },
    grade: "클럽회장",
    register: "가입",
    name: "홍길동",
    sex: "남",
    birth: "1999-02-04",
    rank: "A",
    group: "소속협회",
    si: "A",
    gun: "B",
  },
  {
    number: {
      id: "hhh",
      span: 2,
    },
    grade: "클럽회장",
    register: "가입",
    name: "홍길동",
    sex: "남",
    birth: "1999-02-04",
    rank: "c",
    group: "소속협회",
    si: "c",
    gun: "Bbb",
  },
];

// const columns: ColumnDef<Member>[] = [
//   {
//     header: "급수",

//     columns: [
//       {
//         accessorKey: "si",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorKey: "gun",
//         cell: (info) => info.getValue(),
//       },
//     ],
//   },
//   {
//     accessorKey
//   },
// ];

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "number",
    header: "번호",
    cell: (info) => info.getValue().id,
  },
  {
    accessorKey: "grade",
    header: "회원등급",
  },
  {
    accessorKey: "register",
    header: "회원가입여부",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "sex",
    header: "성별",
  },
  {
    accessorKey: "birth",
    header: "생년월일",
  },
  {
    accessorKey: "rank",
    header: "급수",
    columns: [
      {
        accessorKey: "si",
        header: "시도",
      },
      {
        accessorKey: "gun",
        header: "시군구",
      },
    ],
  },
  //   {
  //     accessorKey: "si",
  //     header: "시도",
  //   },
  //   {
  //     accessorKey: "gun",
  //     header: "시군구",
  //   },
  {
    accessorKey: "group",
    header: "소속협회",
  },
];

const calc = (data: any) => {
  return (
    Object.entries(span).find(([key, value]) => {
      //@ts-ignore
      if (data === key) return span[key];
      //@ts-ignore
    })?.[1]?.rowSpan || 0
  );
};
let sub: any;
console.log(calc("name"), "test");
function Table2() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [custom, setCustom] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2">
      <table>
        <colgroup>
          <col style={{ width: "4%" }} />
          <col />
          <col />
          <col />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead>
          {custom ? (
            <>
              <tr>
                <td rowSpan={2}>번호</td>
                <td rowSpan={2}>회원등급</td>
                <td rowSpan={2}>롸켓가입여부</td>
                <td rowSpan={2}>이름</td>
                <td rowSpan={2}>성별</td>
                <td rowSpan={2}>생년월일</td>
                <td colSpan={2} style={{ borderBottom: "1px solid #000" }}>
                  급수
                </td>
                <td rowSpan={2}>소속협회</td>
              </tr>
              <tr>
                <td>시도</td>
                <td>시군구</td>
              </tr>
            </>
          ) : (
            table.getHeaderGroups().map((headergroup, index) => {
              //   console.log("헤더그룹", headergroup);
              if (headergroup.depth === 0) {
                sub = headergroup.headers.find((v) => v.subHeaders.length >= 2);
                // console.log("댑스0", sub);
                // console.log(
                //   headergroup.headers.find((v) => v.subHeaders.length >= 2),
                //   "댑스 0"
                // );
                return (
                  <tr key={headergroup.id}>
                    {headergroup.headers.map((header) => {
                      console.log("헤더그룹안의 헤더", header);
                      return (
                        <td
                          key={header.id}
                          {...(header.column.id !== "rank" && { rowSpan: 2 })}
                          {...(header.column.id === "rank" && { colSpan: 2 })}
                          //   rowSpan={header.column.id === "rank" ? 0 : ""}
                          //   colSpan={header.column.id === "rank" ? 2 : 0}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              }
              if (headergroup.depth === 1) {
                console.log("댑스1", sub?.subHeaders);
                return (
                  <tr key={sub?.subHeaders.id + "aa"}>
                    {sub?.subHeaders.map((header: any, index: number) => {
                      // console.log("헤더그룹안의 헤더", header.id, headergroup);
                      return (
                        <td key={index}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              }
            })
          )}
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
      </table>
    </div>
  );
}

export default Table2;

// {
//     header: "회원등급",
//     columns: [
//       {
//         header: "ddd",
//         accessorKey: "grade",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "register",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "name",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "sex",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "birth",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "rank",
//         cell: (info: any) => info.getValue(),
//       },
//       {
//         accessorKey: "group",
//         cell: (info: any) => info.getValue(),
//       },
//     ],
//   },
