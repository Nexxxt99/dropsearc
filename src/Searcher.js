import React, { useState } from "react";
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

export class Header extends React.Component {
  render() {
    return <br />;
  }
}

export function SearchItem(props) {
  const [state, setState] = useState({ value: null });
  console.log("props", props);

  return (
    <div className={"search-panel"}>
      <Row>
        <Col span={1}>
          <Icon style={{ marginTop: "7px" }} component={dots} />
        </Col>
        <Col span={8}>
          <Select
            showArrow
            showSearch
            allowClear
            style={{ width: "100%" }}
            value={props.property}
          >
            {USER.map((e, i) => (
              <Option key={e.name}>{e.caption}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            showArrow
            showSearch
            allowClear
            style={{ width: "100%" }}
            value={props.operator}
            onChange={v => props.onChange({ operator: v })}
          >
            {["Равно", "Содержит", "Находится в", "Больше чем"].map((e, i) => (
              <Option key={i}>{e}</Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Input
            value={"default value"}
            value={props.value}
            onChange={v => props.onChange({ value: v.target.value })}
          />
        </Col>
        <Col span={1}>
          <Icon style={{ marginTop: "7px" }} theme="twoTone" type="delete" />
        </Col>
      </Row>
    </div>
  );
}

/*export function SearchItem(v) {
  const [state, setState] = useState({ value: null });

  return (
    <div className={"search-panel"}>
      <div className={"search-row"}>
        <div>
          <Icon style={{ marginTop: "7px" }} component={dots} />
        </div>
        <div style={{ margin: "4px", flexGrow: 3 }}>
          <Select showArrow showSearch allowClear style={{ width: "100%" }}>
            {USER.map((e, i) => (
              <Option key={e.name}>{e.caption}</Option>
            ))}
          </Select>
        </div>
        <div style={{ margin: "4px", flexGrow: 1 }}>
          <Select showArrow showSearch allowClear style={{ width: "100%" }}>
            {["Равно", "Содержит", "Находится в", "Больше чем"].map((e, i) => (
              <Option key={i}>{e}</Option>
            ))}
          </Select>
        </div>
        <div style={{ margin: "4px", flexGrow: 3 }}>
          <Input value={"default value"} />
        </div>
      </div>
    </div>
  );
}*/

const OpTypeMenu = ({ value, onSelect }) => {
  return (
    <Menu
      selectable
      selectedKeys={value}
      onSelect={({ _, key }) => onSelect(key)}
    >
      <Menu.Item key={"Равно"}>Равно</Menu.Item>
      <Menu.Item key={"Содержит"}>Содержит</Menu.Item>
      <Menu.Item key={"Находится в"}>Находится в</Menu.Item>
      <Menu.Item key={"Больше чем"}>Больше чем</Menu.Item>
    </Menu>
  );
};

const OperationsButton = ({ value, onSelect }) => (
  <Dropdown overlay={<OpTypeMenu value={value} onSelect={onSelect} />}>
    <Button type={value ? "primary" : "default"} style={{ width: "150px" }}>
      {value || "Choose operation"}
    </Button>
  </Dropdown>
);

const dots = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 20C9.32843 20 10 19.3284 10 18.5C10 17.6716 9.32843 17 8.5 17C7.67157 17 7 17.6716 7 18.5C7 19.3284 7.67157 20 8.5 20Z"
        fill="#8A90A8"
      />
      <path
        d="M8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5Z"
        fill="#8A90A8"
      />
      <path
        d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7Z"
        fill="#8A90A8"
      />
      <path
        d="M15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
        fill="#8A90A8"
      />
      <path
        d="M15.5 13.5C16.3284 13.5 17 12.8284 17 12C17 11.1716 16.3284 10.5 15.5 10.5C14.6716 10.5 14 11.1716 14 12C14 12.8284 14.6716 13.5 15.5 13.5Z"
        fill="#8A90A8"
      />
      <path
        d="M15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7Z"
        fill="#8A90A8"
      />
    </svg>
  );
};
