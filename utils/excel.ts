import * as XLSX from "xlsx";

const fixdata = (data: any) => {
  let o = "";
  let i = 0;
  let w = 10240;

  for (; i < data.byteLength / w; ++i) {
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(i * w, i * w + w))
    );
  }

  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w)));
  console.log("도대체뭐지??", o);
  return o;
};

export const readExcelFile = (file: File, callback: any) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function (e: ProgressEvent<FileReader>) {
    const data = e.target?.result;
    console.log("데이터 확인좀...", data);
    const arr = fixdata(data);
    const workbook = XLSX.read(btoa(arr), { type: "base64" });
    callback(workbook);
  };
};

export const workbookToJsonArray = (workbook: XLSX.WorkBook) => {
  let jArray = [];

  workbook.SheetNames.forEach(function (sheetName) {
    const roa = XLSX.sheet_to_json(workbook.Sheets[sheetName], {});
  });
};
