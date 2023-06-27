const Hello = () => {
  // 基本型別
  let isDone: boolean = false;
  let decimal: number = 6;
  let color: string = "blue";

  //陣列
  let list: number[] = [1, 2, 3];
  let list2: Array<number> = [1, 2, 3];
  let x: [string, number];
  let arr2: string[][] = [
    ["1", "2"],
    ["3", "4"],
  ];
  //元祖
  let tuple: [string, number, boolean] = ["1", 2, true];
  //列舉
  enum LiveStatus {
    SUCCESS = 0,
    FAIL = -1,
    STREAMING = 1,
  }
  const status = LiveStatus.SUCCESS;
  console.log(status); //0
  //Union
  let aaa: string | number;
  aaa = 1;
  aaa = "1";
  //type
  type A = string | number;
  let a1: A = 1;
  a1 = 999;

  //interface (可擴充) 類別type(不可擴充)
  interface User {
    name: string;
    age: number;
  }
  interface User {
    isPremium?: boolean;
  }
  //---------object----------
  const obj: User = {
    name: "Steven",
    age: 18,
    isPremium: true,
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
    { name: "Steven", dept: "IT" },
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
  interface numObject {
    [propName: string]: number;
  }
  const allNumObject: numObject[] = [
    { no: 1, quentity: 18 },
    { no: 2, quentity: 20 },
    { no: 3, quentity: 22 },
  ];
  type numType = (arr: numObject[]) => number;
  const getNum: numType = (arr) => {
    let num: number = 0;
    arr.forEach((item) => {
      num += item.quentity;
    });
    return num;
  };
  interface visitData {
    [propsName: string]: number;
  }
  return (
    <div>
      <br />
      {getLength(1232)}
      <br />
      {getDept(allDept)}
      <br />
      {getNum(allNumObject)}
    </div>
  );
};
export default Hello;
