import { useEffect, useState } from "react";
import axios from "axios";
import { get } from "http";
const Hello = () => {
  // 基本型別
  const isDone = false;
  const decimal = 6;
  const color = "blue";

  //陣列
  const list: number[] = [1, 2, 3];
  const list2: Array<number> = [1, 2, 3];
  let x: [string, number];
  const arr2: string[][] = [
    ["1", "2"],
    ["3", "4"],
  ];

  //元祖
  const tuple: [string, number, boolean] = ["1", 2, true];
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
  //----unknown & any-----
  type Data = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = (await res.json()) as Data;
    console.log(data);
  };

  const data1: Data = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  };
  type Beta = {
    name: string;
  };
  //假設data1是從伺服器取得的資料，但是我們不確定資料的型別，所以先用unknown
  const beta = data1 as unknown as Beta;
  //------class--------------------
  //private
  //public
  //protected

  class Live {
    roomName: string;
    private id: string;
    protected status: number;
    constructor(rn: string, identify: string, state: number) {
      this.roomName = rn;
      this.id = identify;
      this.status = state;
    }
  }
  class Live2 extends Live {
    constructor(rn: string, identify: string, state: number) {
      super(rn, identify, state);
    }
    start() {
      console.log("start");
    }
  }

  const live = new Live("Steven", "00001", 1);
  const liveSecond = new Live2("Sliven", "00002", 0);
  //console.log(live.id) //error private
  console.log(live, liveSecond);
  interface CarInterface {
    name: string;
    run(): void;
  }

  class car implements CarInterface {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    run() {
      console.log("car is running");
    }
  }
  //-----------泛型----------------
  //泛型是指在定義函式、介面或類別的時候，不預先指定具體的型別，而是在使用的時候再指定型別的一種特性。

  function print<T>(data: T) {
    console.log("data", data);
  }

  print<string>("hello"); //各種不同類型
  print<number>(123);
  print<boolean>(true);
  //--------------untilities----------------
  //-----------------Record------------------
  interface CatInfo {
    age: number;
    breed: string;
  }
  type CatName = "miffy" | "boris" | "mordred";

  //key,value
  const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
  };
  const objI: Record<string, boolean> = {
    name: true,
    //age:12 --->error
  };
  //----------------Pick--------------------
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  //需要重複共用
  type TodoPreview = Pick<Todo, "title" | "completed">;

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    //description: "sddfgf",---->error
  };
  //不須重複共用Omit

  //引數預設值
  const buildName = (firstName: string, lastName = "cat"): string => {
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
    let dept = "";
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
    let num = 0;
    arr.forEach((item) => {
      num += item.quentity;
    });
    return num;
  };

  interface visitData {
    [propsName: string]: number | string | boolean;
  }
  const ajaxData: visitData[] = [
    { createData: "2021-01-01", value: 123, isPremium: true },
    { createData: "2021-01-02", value: 122, isPremium: false },
    { createData: "2021-01-03", value: 121, isPremium: true },
  ];

  type ajaxType = (arr: visitData[]) => number;
  const sumAjaxDataValue: ajaxType = (arr) => {
    let num = 0;
    arr.forEach((item) => {
      const { value } = item;
      num += value as number;
    });
    return num;
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <br />
      {getLength(1232)}
      <br />
      {getDept(allDept)}
      <br />
      {getNum(allNumObject)}
      <br />
      {sumAjaxDataValue(ajaxData)}
      <br />
    </div>
  );
};
export default Hello;
