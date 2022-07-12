import React, { forwardRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }: any) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <>
      <DatePicker
        fixedHeight
        customInput={<ExampleCustomInput />}
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        locale="ko"
        useWeekdaysShort={true}
        onChange={(date: Date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        locale="ko"
        onChange={(date: Date) => setendDate(date)}
      />
    </>
  );
};

export default DatePick;
