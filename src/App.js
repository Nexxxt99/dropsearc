import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { AutoComplete, Input, Icon, Dropdown, Menu, Modal, Table } from "antd";
import { observer, Observer } from "mobx-react";

import { TableStore } from "./State/Stores";

import { SearchItem } from "./Searcher";
import { SearchConditions } from "./SearchItem";
import { ControlPanel } from "./ControlPanel";
import { ResultTable } from "./ResultTable";
import { BaseContext } from "./contexts/BaseContext";
import {
  CompoundCondition,
  Condition,
  ControlStore
} from "./State/BaseSearchStore";

let searchStoreInternal = new CompoundCondition("AND", [
  new Condition("name", "equals", "Alex"),
  new Condition("age", "equals", "10"),
  new Condition("gender", "equals", "male")
]);

const ObserverApp = observer(
  class App extends React.Component {
    searchStore = new ControlStore();

    constructor(props) {
      super(props);
      this.state = { visible: true };
      console.log(props);
    }

    handleClose() {
      this.setState({ visible: false });
    }

    render() {
      const dataSource = ["Part 1", "Part 2", "Part 3", "Part 4", "Part 5"];
      return (
        <div>
          <p>Start editing to see some magic happen :)</p>
          <AutoComplete
            dataSource={dataSource}
            onFocus={() => this.setState({ open: true })}
          >
            <Input
              value={"Hello StackBlitz!"}
              suffix={
                <span>
                  <Icon type="close" onClick={() => console.log("close")} />
                  <Icon
                    type="search"
                    onClick={() => {
                      this.searchStore = new CompoundCondition("AND");
                      this.setState({ open: false, visible: true }, () =>
                        this.setState({ open: true })
                      );
                    }}
                  />
                </span>
              }
            />
          </AutoComplete>
          <Modal
            visible={this.state.visible}
            onOk={this.handleClose.bind(this)}
            onCancel={this.handleClose.bind(this)}
            width={"90vw"}
          >
            <ControlPanel store={this.searchStore}>
              {this.searchStore.conditions && (
                <SearchConditions store={this.searchStore.conditions} />
              )}
            </ControlPanel>
          </Modal>
        </div>
      );
    }
  }
);

ObserverApp.contextType = BaseContext;

export { ObserverApp as App };
