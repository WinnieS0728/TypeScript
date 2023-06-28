import { useState } from "react";
interface practiceProps {
  desc: string;
  children: React.ReactNode;
}

const Practice = ({ desc, children }: practiceProps) => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>{children}</h1>
      <p>{desc}</p>
      <h3>{count}</h3>
      <button
        style={{ width: "50px", height: "50px", margin: "10px" }}
        onClick={() => {
          setCount((pre) => pre + 1);
        }}
      >
        +1
      </button>
      <button
        style={{ width: "50px", height: "50px", margin: "10px" }}
        onClick={() => {
          setCount((pre) => pre - 1);
        }}
      >
        -1
      </button>
    </div>
  );
};

export default Practice;
