import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  AutoComplete,
  Input,
  Icon,
  Col,
  Row,
  Button,
  Dropdown,
  Menu,
  Select
} from "antd";
import "./style.css";

const { Option } = Select;

import { USER, SYSUSER, ORGUNIT } from "./Data";

const operations = ["AND", "OR", "EXCEPT", "ANY"];

export const SearchConditions = observer(
  class SearchConditions extends React.Component {
    render() {
      const { operator, conditions, onAdd } = this.props.store;
      return (
        <>
          <Row>
            <Col>
              <Button type={"danger"}>{operator}</Button>
              <Button type={"primary"} onClick={() => onAdd("AND")}>
                Add AND
              </Button>
              <Button type={"primary"} onClick={() => onAdd("OR")}>
                Add OR
              </Button>
            </Col>
          </Row>
          <Row>
            <ul>
              {conditions.map((e, i) => {
                if (e.hasOwnProperty("conditions"))
                  return <SearchConditions key={i} store={e} />;
                else
                  return (
                    <SearchItem
                      key={i}
                      store={e}
                      onRemove={this.props.store.onRemove.bind({}, i)}
                    />
                  );
              })}
            </ul>
          </Row>
        </>
      );
    }
  }
);

export const SearchItem = observer(
  class SearchItem extends React.Component {
    render() {
      let {
        store: { leftOperand, rightOperand, operator, onChange },
        onRemove
      } = this.props;

      return (
        <li>
          <Input className={"input"} value={leftOperand} />
          <Input className={"input"} value={operator} />
          <Input className={"input"} value={rightOperand} />
          <Button icon="delete" onClick={onRemove} />
        </li>
      );
    }
  }
);
