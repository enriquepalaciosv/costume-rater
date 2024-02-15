import React from "react";
import { Card, Flex, Typography, Rate } from "antd";

export const Rater: React.FC = () => {
  const { Title } = Typography;
  return (
    <Flex vertical>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Flex justify="center">
          <Title level={3}>Los increibles</Title>
        </Flex>
      </Card>
      <Rate />
    </Flex>
  );
};
