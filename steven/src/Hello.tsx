const Hello = () => {
  const sayHello = (person: string) => {
    return `Hello, ${person}`;
  };
  const saySomeThing = (someThing: any) => {
    return someThing;
  };
  const mySum = (a: number, b: number): number => {
    return a + b;
  };
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
  return (
    <div>
      {Bot({ id: 1, name: "Steven", age: 18, job: "programer" })}
      <br />
      {typeof mySum(1, 2)}
    </div>
  );
};
export default Hello;
