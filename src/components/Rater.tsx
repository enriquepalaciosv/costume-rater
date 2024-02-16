import React from "react";
import { Card, Space, Typography, Rate, Descriptions } from "antd";

export const Rater: React.FC = () => {
  const { Title } = Typography;
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
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
        <Title level={3}>Los increibles</Title>
      </Card>
      <Descriptions bordered>
        <Descriptions.Item label="Divertido">
          <Rate />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered>
        <Descriptions.Item label="Creativo">
          <Rate />
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered>
        <Descriptions.Item label="Hecho a mano">
          <Rate />
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};
