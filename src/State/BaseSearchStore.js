import {
  observable,
  action,
  makeAutoObservable,
  makeObservable,
  computed,
  when,
  autorun,
  toJS
} from "mobx";

const makeJSON = obj => {};

export class ControlStore {
  conditions = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  onAddAnd = () => {
    console.log("here");
    if (this.conditions) {
      this.conditions.onAdd("AND");
    } else {
      this.conditions = new CompoundCondition("AND", [new Condition()]);
    }
    console.log(this.conditions);
  };

  onAddOr = () => {
    console.log("here");
    if (this.conditions) {
      this.conditions.onAdd("OR");
    } else {
      this.conditions = new CompoundCondition("OR", [new Condition()]);
    }
    console.log(this.conditions);
  };

  onRemove = () => {
    this.conditions = undefined;
  };

  getFiltersText = () => console.log(toJS(this.conditions));
}

export class Condition {
  leftOperand = undefined;
  rightOperand = undefined;
  operator = undefined;

  constructor(leftOperand, operator, rightOperand, rootStore) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.operator = operator;

    makeObservable(this, {
      leftOperand: observable,
      rightOperand: observable,
      operator: observable,
      onChangeRight: action
    });
  }

  onChangeRight = value => (this.rightOperand = value);
}

export class CompoundCondition {
  conditions = [];
  operator = undefined;

  constructor(operator, conditions, rootStore) {
    this.operator = operator;

    if (conditions && conditions.length >= 0) {
      this.conditions = conditions;
      conditions.forEach(e => (e.rootStore = this));
    }

    makeObservable(this, {
      conditions: observable,
      operator: observable,
      onAdd: action,
      onRemove: action,
      reorder: action
    });
  }

  onAdd = operator => {
    if (this.conditions.length > 1 && this.operator != operator) {
      let condition = new CompoundCondition(
        this.operator,
        this.conditions,
        this
      );
      this.conditions = [condition];
    }

    this.conditions.push(new Condition(void 0, void 0, void 0, this));

    this.operator = operator;
  };

  onRemove = item => {
    let idx = this.conditions.indexOf(item);
    this.conditions.splice(idx, 1);
  };

  reorder = item => {
    this.conditions[0] = item;
  };
}
