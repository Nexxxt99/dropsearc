import React from "react";
import { Card, Row, Col, Button, Tabs, List } from "antd";
import { observer } from "mobx-react";

const rows = [
  { name: "Alex", age: 20, job: "manager", sal: 5000 },
  { name: "Nick", age: 25, job: "worker", sal: 7000 },
  { name: "Sara", age: 22, job: "CEO", sal: 35000 },
  { name: "Michel", age: 35, job: "ingeneer", sal: 4000 }
];

export const ControlPanel = observer(
  ({ store: { onAddAnd, onAddOr, getFiltersText }, children }) => {
    const getRowsInternal = () => {
      new Promise(res =>
        setTimeout(() => {
          console.log("resolved");
          res({ rows });
        }, 1000)
      ).then(({ rows }) => apply(rows));
    };

    return (
      <>
        <div className={"controls-row"}>
          <div>
            <Button type={"default"} onClick={onAddAnd}>
              + Add AND condition
            </Button>
            <Button type={"default"} onClick={onAddOr}>
              + Add OR condition
            </Button>
          </div>
          <div>
            <Button type={"primary"} onClick={getFiltersText}>
              Apply filter
            </Button>
          </div>
        </div>
        {children}
      </>
    );
  }
);
