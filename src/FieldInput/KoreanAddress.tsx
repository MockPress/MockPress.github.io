import { ChangeEventHandler, useEffect, useState } from "react";

function KoreanAddress({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };

  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
    </>
  );
}

export default KoreanAddress;
