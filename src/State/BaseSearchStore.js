import { observable, action, makeAutoObservable, when, autorun } from "mobx";

export class BaseSearchStore {
  conditions = undefined;

  onAdd;
}

export class Condition {
  leftOperand = undefined;
  rightOperand = undefined;
  operator = undefined;
  idx = undefined;

  constructor(leftOperand, operator, rightOperand, idx) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.operator = operator;

    makeAutoObservable(this);
  }

  onChange = (operand, value) => (this[operand] = value);
}

export class CompoundCondition {
  conditions = [];
  operator = undefined;
  disposer;

  constructor(operator, conditions) {
    this.operator = operator;

    if (conditions && conditions.length >= 0) this.conditions = conditions;

    makeAutoObservable(this);

    this.disposer = autorun(() => {
      if (
        this.conditions.length > 0 &&
        this.conditions[0].hasOwnProperty("conditions") &&
        this.conditions[0].conditions.length == 1
      ) {
        console.log("when");
        this.conditions[0].disposer();
        this.conditions[0] = this.conditions[0].conditions[0];
      }
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

    this.conditions.push(
      new Condition(void 0, void 0, void 0, this, this.conditions.length)
    );

    this.operator = operator;
  };

  onRemove = idx => {
    this.conditions.splice(idx, 1);
  };
}
