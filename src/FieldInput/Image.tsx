import { ChangeEventHandler, useEffect, useState } from "react";

function Image({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [size, setSize] = useState({ width: 300, height: 300 });
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };
  const setWidth: ChangeEventHandler<HTMLInputElement> = (e) => {
    const width = e.target.valueAsNumber;
    setSize((prev) => ({ ...prev, width }));
  };
  const setHeight: ChangeEventHandler<HTMLInputElement> = (e) => {
    const height = e.target.valueAsNumber;
    setSize((prev) => ({ ...prev, height }));
  };

  useEffect(() => {
    setFieldData({ params: [size.width, size.height] });
  }, []);

  useEffect(() => {
    setFieldData({ params: [size.width, size.height] });
  }, [size]);
  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
      <label>width: </label>
      <input type={"number"} value={size.width} onChange={setWidth} />
      <label>height: </label>
      <input type={"number"} value={size.height} onChange={setHeight} />
    </>
  );
}

export default Image;
