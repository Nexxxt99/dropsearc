import { observable, action, makeAutoObservable, when, autorun } from "mobx";

export class BaseSearchStore {
  conditions = undefined;
  
  
}

export class Condition {
  rootStore = undefined;

  leftOperand = undefined;
  rightOperand = undefined;
  operator = undefined;
  idx = undefined;

  constructor(leftOperand, operator, rightOperand, rootStore) {
    this.rootStore = rootStore;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.operator = operator;

    makeAutoObservable(this);
  }

  onChangeRight = value => (this.rightOperand = value);

  onRemove = () => {
    this.rootStore.onRemove(this);
    this.rootStore = void 0;
  };
}

export class CompoundCondition {
  conditions = [];
  operator = undefined;
  rootStore;

  constructor(operator, conditions, rootStore) {
    this.operator = operator;
    this.rootStore = rootStore;
    if (conditions && conditions.length >= 0) this.conditions = conditions;

    makeAutoObservable(this);
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

    if (this.rootStore && this.conditions.length == 1) {
      this.rootStore.conditions[0] = this.conditions[0];
      this.rootStore = void 0;
    }
  };
}
