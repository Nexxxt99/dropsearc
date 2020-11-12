import React from "react";
import "./style.css";
import "antd/dist/antd.css";
import { AutoComplete, Input, Icon, Dropdown, Menu, Modal, Table } from "antd";
import { observer, Observer } from "mobx-react";

import { TableStore } from "./State/Stores";

import { SearchItem } from "./Searcher";
import { SearchConditions } from "./SearchItem";
import { ControlPanel } from "./ControlPanel";
import { ResultTable } from "./ResultTable";
import { BaseContext } from "./contexts/BaseContext";
import { CompoundCondition, Condition } from "./State/BaseSearchStore";

let searchStoreInternal = new CompoundCondition("AND", [
  new Condition("name", "equals", "Alex"),
  new Condition("age", "equals", "10"),
  new Condition("gender", "equals", "male")
]);

let searchStore = new CompoundCondition("AND");

searchStoreInternal.rootStore = searchStore;

const ObserverApp = observer(
  class App extends React.Component {
    constructor(props) {
      super(props);

      console.log(props);
    }

    handleClose() {
      this.setState({ modal: false });
      console.log(this.state.getStateText());
    }

    render() {
      console.log("context", this.context);
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
                    onClick={() =>
                      this.setState({ open: false, modal: true }, () =>
                        this.setState({ open: true })
                      )
                    }
                  />
                </span>
              }
            />
          </AutoComplete>
          <Modal
            visible={true}
            /*onOk={this.handleClose.bind(this)}
            onCancel={this.handleClose.bind(this)}*/
            width={"90vw"}
          >
            <SearchConditions store={searchStore} />
          </Modal>
        </div>
      );
    }
  }
);

ObserverApp.contextType = BaseContext;

export { ObserverApp as App };