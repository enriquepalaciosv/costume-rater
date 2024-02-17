import React from "react";
import { List, Space, Typography, Rate, Image } from "antd";
import { getAvatar } from '../utils/avatar-util';
import { Competitor } from "../types/Competitor";

export const Rater: React.FC = () => {

  const data = [
    'Divertido',
    'Original',
    'A mano',
    'Maquillaje',
    'Pasarela',
  ];

  const avatar = getAvatar(Competitor.Group)
  const current = 'Nombre del disfraz';

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
      <Image src={avatar} width={200} />
      <Typography.Title level={3} style={{ textAlign: 'center' }}>{current}</Typography.Title>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ marginRight: '8px', fontSize: '1.2rem' }}>{item}</Typography.Text>
            <Rate style={{ fontSize: '28px' }} />
          </List.Item>
        )}
      />
    </Space>
  );
};
