import { ChangeEventHandler, useEffect, useState } from "react";

function AutoIncrement({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [startPoint, setStartPoint] = useState(0);
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };
  const setParam: ChangeEventHandler<HTMLInputElement> = (e) => {
    const param = e.target.valueAsNumber;
    setStartPoint(param);
    setFieldData({ params: [param] });
  };

  useEffect(() => {
    setFieldData({ params: [startPoint] });
  }, []);
  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
      <label>startingPoint: </label>
      <input type={"number"} value={startPoint} onChange={setParam} />
    </>
  );
}

export default AutoIncrement;
