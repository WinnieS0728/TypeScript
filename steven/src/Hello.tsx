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
  type calculatorType = (...restProps: number[]) => number;
  const sum: calculatorType = (...restProps) => {
    return restProps.reduce((a, b) => a + b);
  };

  return (
    <div>
      {Bot({ id: 1, name: "Steven", age: 18, job: "programer" })}
      <br />
      {sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)}
    </div>
  );
};
export default Hello;
