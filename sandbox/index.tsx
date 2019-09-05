import * as React from "react";
import { render } from "react-dom";
import { Store } from "../src";
import { useSubscribe } from "use-subscribe";
import immer from "immer";

const store = Store.Create({
  defaultProcessor: immer
});

type PeopleCollection = string[]
const peopleCollection = Store.CreateCollection<PeopleCollection>({
  store,
  collectionName: "people",
  initialValue: ["Greg"]
});

const App = () => {
  const people = useSubscribe(peopleCollection);

  const addPerson = () => {
    const person = prompt("Enter persons name?");
    peopleCollection.query(draft => {
      draft.push(person);
    });
  };

  return (
    <div className="App">
      <button onClick={addPerson}>Add</button>
      {people.map((person, i) => (
        <div key={i}>{person}</div>
      ))}
    </div>
  );
};

const rootElement = document.getElementById("app");
render(<App />, rootElement);
