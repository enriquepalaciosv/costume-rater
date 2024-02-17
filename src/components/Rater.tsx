import React from "react";
import { List, Space, Typography, Rate, Descriptions, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

export const Rater: React.FC = () => {
  const { Title, Text } = Typography;

  const data = [
    'Divertido',
    'Original',
    'Hecho a mano',
    'Maquillaje',
    'Pasarela',
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>

      <Avatar size={64} icon={<UserOutlined />} />
      <Title level={3}>Los increibles</Title>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Text style={{ marginRight: '8px' }}>{item}</Text>
            <Rate />
          </List.Item>
        )}
      />

    </Space>
  );
};
