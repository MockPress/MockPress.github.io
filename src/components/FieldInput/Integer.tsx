import { ChangeEventHandler, useEffect, useState } from "react";

function Integer({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [range, setRange] = useState({ min: 0, max: 1000 });
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
      <div>
        <label>name: </label>
        <input type={"text"} value={data.name} onChange={setName} />
      </div>
      <div>
        <label>min: </label>
        <input type={"number"} value={range.min} onChange={setMin} />
      </div>
      <div>
        <label>max: </label>
        <input type={"number"} value={range.max} onChange={setMax} />
      </div>
    </>
  );
}

export default Integer;
