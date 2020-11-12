import { observable, action, makeObservable, autorun, computed } from "mobx";
import { TableStore } from "./Stores";

export class SearchState {
  filters = [];
  tableStore = null;

  constructor() {
    this.tableStore = new TableStore(this);

    makeObservable(
      this,
      {
        filters: observable,
        onAdd: action,
        onApply: action.bound
      },
      autorun(() => console.log("filters changed", this.filters.length))
    );
    autorun(() => console.log("filters changed", this.filters.length));
  }

  onAdd = () => {
    this.filters.push(new Filter(this, this.filters.length));
    console.log("onAfterPush");
  };

  onApply = () => {
    console.log("try force loading", this.tableStore);
    this.tableStore.getRowsAsync();
  };
}

export class Filter {
  idx;
  leftOperand = "";
  operator = "";
  rightOperand = "";
  
  rootStore;
  
  constructor(store, idx) {
    this.rootStore = store;
    this.idx = idx;

    makeObservable(
      this,
      {
        leftOperand: observable,
        operator: observable,
        rightOperand: observable,
        onChange: action,
        onRemove: action
      },
      autorun(() => console.log("store changed", this.property))
    );
  }

  onChange = val => {
    for (let k in val) if (this.hasOwnProperty(k)) this[k] = val[k];
  };

  onRemove = () => {
    this.rootStore.splice(this.idx, 1);
  };
}
