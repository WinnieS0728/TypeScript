const Hello = () => {
  
  const sayHello = (person: string) => {
    return `Hello, ${person}`;
  };
  const saySomeThing = (someThing: any) => {
    return someThing;
  };

  const self = () => {};
  return (
    <div>
      {sayHello("Steven") + `,you are learning ` + saySomeThing(true)}
      <br />
    </div>
  );
};
export default Hello;
