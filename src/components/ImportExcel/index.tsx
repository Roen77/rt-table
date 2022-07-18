import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
function ImportExcel() {
  const [sample, setSample] = useState("");
  const fileRef = useRef(null);
  const handleClick = () => {
    if (fileRef.current) {
      //@ts-ignore
      fileRef.current.click();
    }
  };
  const handleFile = (e: any) => {
    let result: any[][] = [];
    const reader = new FileReader();
    const files = e.target.files[0];
    console.log(e, "실행 파일좀", files);
    return new Promise<void>((resolve) => {
      reader.onload = (e: any) => {
        const data = e.target.result;
        const wb = XLSX.read(data, { type: "binary" });
        // console.log("결과좀", data, wb);
        // setSample("ㅁㅁㅁ");
        const wsName = wb.SheetNames[0];
        let worksheet = wb.Sheets[wsName];
        let row;
        let rowNum;
        let colNum;
        let range = XLSX.utils.decode_range(worksheet["!ref"] as string);
        console.log("범위확인좀", range);

        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            let nextCell =
              worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
            if (typeof nextCell === "undefined") {
              row.push(void 0);
            } else row.push(nextCell.w);
          }
          result.push(row);
        }
        console.log("result 확인좀", result);
        resolve();
      };
      reader.readAsArrayBuffer(files);
    });
    // reader.onload = (e) => {
    //   let data = e.target?.result;
    //   console.log("결과값좀", data);
    // };
  };
  return (
    <div>
      <button onClick={handleClick}>업로드</button>
      <input
        ref={fileRef}
        // style={{ display: "none" }}
        type="file"
        accept=".xlsx"
        onChange={handleFile}
      />
      <div>{sample}</div>
    </div>
  );
}

export default ImportExcel;

// 참고 사이트 https://potential-coding.tistory.com/34
// 날짜포맷관련 참고 https://github.com/SheetJS/sheetjs/issues/780
