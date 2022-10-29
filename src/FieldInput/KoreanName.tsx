import { ChangeEventHandler, useEffect, useState } from "react";

function KoreanName({
  data,
  setFieldData,
}: {
  data: { name: string; params: unknown[] };
  setFieldData: any;
}) {
  const [gender, setGender] = useState("");
  const setName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFieldData({ name: e.target.value });
  };
  const setParam: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const param = e.target.value;
    setGender(param);
    setFieldData({ params: [param] });
  };

  useEffect(() => {
    setFieldData({ params: [gender] });
  }, []);
  return (
    <>
      <label>name: </label>
      <input type={"text"} value={data.name} onChange={setName} />
      <label>gender: </label>
      <select value={gender} onChange={setParam}>
        <option value={""}>any</option>
        <option value={"male"}>male</option>
        <option value={"female"}>female</option>
      </select>
    </>
  );
}

export default KoreanName;
