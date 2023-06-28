import React from "react";
import Hello from "./Hello";
import Practice from "./practice";
import SalesVisit from "./SalesVisit";

function App() {
  return (
    <div className="App">
      <Practice desc="React component with typescript">練習TS</Practice>
      <SalesVisit />
      <Hello />
    </div>
  );
}

export default App;
