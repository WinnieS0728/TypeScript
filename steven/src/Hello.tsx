import { get } from "http";

const Hello = () => {
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: string | number | undefined;
  }
  const Bot: (person: Person) => string = (person) => {
    const { name, age, job } = person;
    return `Hello,my name is ${name},I'm ${age} years old. my job is ${job}`;
  };
  type calculatorType = (...restProps: number[]) => number;
  const sum: calculatorType = (...restProps) => {
    return restProps.reduce((a, b) => a + b);
  };

  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  const getName = (n: NameOrResolver): Name => {
    if (typeof n === "string") {
      return n;
    } else {
      return n();
    }
  };

  // type cal = (x: number, y: number) => number;
  // let mySum: cal = (x, y) => {
  //   return x + y;
  // };

  interface cal {
    (x: number, y: number): number;
  }
  const mySum: cal = (x, y) => {
    return x + y;
  };

  //引數預設值
  const buildName = (firstName: string, lastName: string = "cat"): string => {
    return firstName + " " + lastName;
  };

  type calLength = (something: string | number) => number;
  const getLength: calLength = (something) => {
    if ((something as string).length) {
      return (something as string).length;
    } else {
      return something.toString().length;
    }
  };
  interface stringObject {
    [propName: string]: string;
  }
  const allDept: stringObject[] = [
    { name: "Steven", dept: "IT"},
    { name: "John", dept: "Research" },
    { name: "Mary", dept: "Sales" },
  ];
  type deptType = (arr: stringObject[]) => string;
  const getDept: deptType = (arr) => {
    let dept: string = "";
    arr.forEach((item) => {
      dept += "_" + item.dept;
    });
    return dept;
  };
  return (
    <div>
      {Bot({ id: 1, name: "Steven", age: 18, job: "programer" })}
      <br />
      {sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)}
      <br />
      {getName("Steven")}
      <br />
      {mySum(1, 2)}
      <br />
      {getLength(1232)}
      <br />
      {getDept(allDept)}
    </div>
  );
};
export default Hello;
