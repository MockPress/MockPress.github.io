import { ChangeEventHandler, useEffect, useState } from "react";
import styled from "styled-components";

const isValidDate = (date: unknown) => {
  return date && Object.prototype.toString.call(date) === "[object Date]";
};

const dateToYYYYMMDD = (date: Date) => {
  if (!isValidDate(date)) throw new Error("date is not valid");

  const offset = date.getTimezoneOffset();
  const temp = new Date(date.getTime() - offset * 60 * 1000);
  const yyyymmdd = temp.toISOString().split("T")[0]; // ISO8601 === YYYY-MM-DDTHH:mm:ss.sssZ
  return yyyymmdd;
};

function DateField({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const now = new Date();
  const end = new Date(new Date().setMonth(now.getMonth() + 1));
  const [range, setRange] = useState({
    startDate: now,
    endDate: end,
  });
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };
  const setStartDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const startDate = e.target.value;
    setRange((prev) => ({ ...prev, startDate: new Date(startDate) }));
  };
  const setEndDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const endDate = e.target.value;
    setRange((prev) => ({ ...prev, endDate: new Date(endDate) }));
  };

  useEffect(() => {
    setFieldData({ params: [range.startDate, range.endDate] });
  }, []);

  useEffect(() => {
    setFieldData({ params: [range.startDate, range.endDate] });
  }, [range]);
  return (
    <>
      <div>
        <label>name: </label>
        <input type={"text"} value={data.name} onChange={setName} />
      </div>
      <DateFieldContainer>
        <div>
          <label>start date: </label>
          <input
            type={"date"}
            value={dateToYYYYMMDD(range.startDate)}
            onChange={setStartDate}
          />
        </div>
        <div>
          <label>end date: </label>
          <input
            type={"date"}
            value={dateToYYYYMMDD(range.endDate)}
            onChange={setEndDate}
          />
        </div>
      </DateFieldContainer>
    </>
  );
}

export default DateField;

const DateFieldContainer = styled.div`
  display: flex;
  gap: 10px;
  input[type="date"] {
    padding: 5px;
  }
`;
