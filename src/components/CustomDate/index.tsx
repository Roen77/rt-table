import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getDay, getMonth, getYear } from "date-fns";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
registerLocale("ko", ko);
function CustomPicker() {
  const date = dayjs("2022-10-10");
  console.log("format", date.format("YYMMDD"));
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    console.log("날짜확인", startDate);
  }, [startDate]);
  const years = _.range(2022, getYear(new Date()) + 10, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return (
    <ReactDatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            className="year"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="next"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      locale="ko"
      placeholderText="날짜 선택"
    />
  );
}

export default CustomPicker;
