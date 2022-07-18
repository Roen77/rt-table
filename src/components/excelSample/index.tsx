import React, { useCallback } from "react";
// import * as XLSX from "xlsx/xlsx.mjs";
import * as XLSX from "xlsx";
function ExSample() {
  const xport = useCallback(async () => {
    /* Create worksheet from HTML DOM TABLE */
    const table = document.getElementById("Table2XLSX");
    const wb = XLSX.utils.table_to_book(table, { raw: true });

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
  }, []);
  return (
    <>
      <table id="Table2XLSX">
        <tbody>
          <tr>
            <td colSpan={3}>SheetJS Table Export</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>ID</td>
            <td>Note</td>
          </tr>
          <tr>
            <td>SheetJS</td>
            <td>7262</td>
            <td>1999-02-12</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <a href="//sheetjs.com">Powered by SheetJS</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={xport}>
        <b>Export XLSX!</b>
      </button>
    </>
  );
}

export default ExSample;
