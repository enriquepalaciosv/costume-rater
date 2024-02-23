import React from "react";
import { Flex } from "antd";
import { Rater } from "./components/Rater";

function App() {
  return (
    <Flex vertical justify="center" align="center" style={{ margin: '16px' }}>
      <Rater />
    </Flex>
  );
}

export default App;
