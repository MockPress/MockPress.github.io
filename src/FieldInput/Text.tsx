import { ChangeEventHandler, useEffect, useState } from "react";

function Text({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [range, setRange] = useState({ min: 4, max: 8 });
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

  useEffect(() => {
    setFieldData({ params: [range.min, range.max] });
  }, []);

  useEffect(() => {
    setFieldData({ params: [range.min, range.max] });
  }, [range]);
  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
      <label>min: </label>
      <input type={"number"} value={range.min} onChange={setMin} />
      <label>max: </label>
      <input type={"number"} value={range.max} onChange={setMax} />
    </>
  );
}

export default Text;
