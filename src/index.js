import React from "react";
import ReactDOM from "react-dom";

import { observer, Observer } from "mobx-react";

import { App } from "./App";

import { TestObserver, TestApp } from "./TestObserver";

import { SearchState } from "./State/SearchState";
import { counter, person } from "./State/Stores";

import { BaseContext } from "./contexts/BaseContext";

const store = new SearchState();

const ObserverApp = observer(({ store }) => {
  console.log(store.filters);
  return <App {...{ store: store }} />;
});

ReactDOM.render(
  <BaseContext.Provider value={{ param: 1000 }}>
    <App store={store} />
  </BaseContext.Provider>,
  document.getElementById("root")
);
//ReactDOM.render(<TestApp person={person} />, document.getElementById("root"));
/*ReactDOM.render(
  <TestObserver counter={counter} />,
  document.getElementById("root")
);*/

/*ReactDOM.render(
  <div>asd{React.createElement("h1", null, "simle text")}</div>,
  document.getElementById("root")
);*/
