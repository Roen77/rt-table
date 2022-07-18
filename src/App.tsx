import React from "react";
import logo from "./logo.svg";
import Table from "./components/Table";
import Table2 from "./components/Table2";
import Table3 from "./components/Table3";
import DatePick from "./components/DatePicker";
import CustomPicker from "./components/CustomDate";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Postcode from "./components/PostCode";
import ExSample from "./components/excelSample";
import ImportExcel from "./components/ImportExcel";

function App() {
  return (
    <div>
      {/* <DatePick /> */}
      {/* <CustomPicker />
      <CustomPicker /> */}
      {/* <Postcode />
      <Table />*/}
      <ExSample />
      <ImportExcel />
    </div>
  );
}

export default App;
