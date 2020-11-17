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
    onRemove(item) {
      console.log([...this.props.store.conditions]);
      this.props.store.onRemove(item);
      if (this.props.store.conditions.length == 1) {
        this.props.onRemove(item)
      }
    }

    render() {
      console.log("prps", this.props);
      const { operator, conditions, onAdd } = this.props.store;
      return (
        <div className="search-panel-compound">
          <ul>
            {[...conditions].reverse().map((e, i) => {
              if (e.hasOwnProperty("conditions"))
                return (
                  <SearchConditions
                    key={i}
                    store={e}
                    onRemove={this.onRemove.bind(this, e)}
                  />
                );
              else
                return (
                  <SearchItem
                    key={i}
                    store={e}
                    onRemove={this.onRemove.bind(this, e)}
                  />
                );
            })}
          </ul>
        </div>
      );
    }
  }
);

export const SearchItem = observer(
  class SearchItem extends React.Component {
    onChange = v => {
      this.props.store.onChangeRight(v.target.value);
    };

    render() {
      const menu = (
        <Menu>
          <Menu.Item key="1">+ Add field</Menu.Item>
        </Menu>
      );

      let {
        store: { leftOperand, rightOperand, operator, onChangeRight },
        onRemove
      } = this.props;

      return (
        <li className={"search-panel"}>
          <Icon type={"more"} />
          <Icon type={"more"} />
          <Input className={"inputLoc"} value={leftOperand} />
          <Input className={"inputLoc"} value={operator} />
          <Input
            className={"inputLoc"}
            value={rightOperand}
            onChange={this.onChange}
          />
          <Dropdown overlay={menu}>
            <Button className={"btn"} icon={"ellipsis"} />
          </Dropdown>
          <Button className={"btn"} icon="delete" onClick={onRemove} />
        </li>
      );
    }
  }
);
