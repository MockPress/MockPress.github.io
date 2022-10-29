import { ChangeEventHandler, useEffect, useState } from "react";

function Money({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [range, setRange] = useState({ min: 0, max: 10000, interval: 1000 });
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };
  const setMin: ChangeEventHandler<HTMLInputElement> = (e) => {
    const min = e.target.valueAsNumber;
    setRange((prev) => ({ ...prev, min }));
  };
  const setMax: ChangeEventHandler<HTMLInputElement> = (e) => {
    const max = e.target.valueAsNumber;
    setRange((prev) => ({ ...prev, max }));
  };
  const setInterval: ChangeEventHandler<HTMLInputElement> = (e) => {
    const interval = e.target.valueAsNumber;
    setRange((prev) => ({ ...prev, interval }));
  };

  useEffect(() => {
    setFieldData({ params: [range.min, range.max, range.interval] });
  }, []);

  useEffect(() => {
    setFieldData({ params: [range.min, range.max, range.interval] });
  }, [range]);
  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
      <label>min: </label>
      <input type={"number"} value={range.min} onChange={setMin} />
      <label>max: </label>
      <input type={"number"} value={range.max} onChange={setMax} />
      <label>interval: </label>
      <input type={"number"} value={range.interval} onChange={setInterval} />
    </>
  );
}

export default Money;
