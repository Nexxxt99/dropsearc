import React from "react";
import { Table, Button } from "antd";
import { observer } from "mobx-react";

export const ResultTable = observer(({ store }) => {
  const tableProps = {
    columns: [...store.columns],
    dataSource: [...store.rows],
    loading: store.state
  };
  console.log(tableProps);
  return (
    <>
      <Table {...tableProps} />
      <Button onClick={() => store.getRowsAsync()}>ClickMe</Button>
    </>
  );
});
