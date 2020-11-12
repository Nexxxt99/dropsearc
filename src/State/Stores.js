import { makeObservable, action, observable, autorun } from "mobx";
import { BaseContext } from "../contexts/BaseContext";
import { useContext } from "react";

const rows = [
  { name: "Alex", age: 20, job: "manager", sal: 5000 },
  { name: "Nick", age: 25, job: "worker", sal: 7000 },
  { name: "Sara", age: 22, job: "CEO", sal: 35000 },
  { name: "Michel", age: 35, job: "ingeneer", sal: 4000 }
];

const columns = [
  {
    title: "Names",
    dataIndex: "name",
    key: "name",    
    className:"hidden-col"
  },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Job", dataIndex: "job", key: "job" },
  { title: "Sal", dataIndex: "sal", key: "sal" }
];

export class TableStore {
  columns = columns;
  rows = [];
  state = false;
  ctx = null;

  constructor() {
    makeObservable(this, {
      columns: observable,
      state: observable,
      rows: observable,
      getRows: action.bound,
      showSpinner: action,
      hideSpinner: action
    });

    autorun(() =>
      console.log(this.state ? "loading" : "loaded", this.contextType)
    );

    autorun(() => console.log("length", this.rows.length));
  }

  showSpinner = () => (this.state = true);

  hideSpinner = () => (this.state = false);

  getRowsAsync = () => {
    this.showSpinner();
    console.log("start loading action");

    new Promise(res =>
      setTimeout(() => {
        console.log("resolved");
        res({ rows });
      }, 1000)
    )
      .then(
        action("fetchSuccess", ({ rows }) => {
          this.rows = [...this.rows, ...rows];
          console.log("this.rows", this.rows);
        })
      )
      .then(this.hideSpinner);
  };

  getRows = rows => {
    this.rows = rows;
  };
}

TableStore.contextType = BaseContext;
