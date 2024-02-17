import React from "react";
import { List, Space, Typography, Rate, Image } from "antd";
import { getAvatar } from '../utils/avatar-util';
import { Participant } from "../types/Participant";

export const Rater: React.FC = () => {
  const { Title, Text } = Typography;

  const data = [
    'Divertido',
    'Original',
    'Hecho a mano',
    'Maquillaje',
    'Pasarela',
  ];

  const avatar = getAvatar(Participant.AdultFemale)
  const current = 'Un Villano/Héroe';

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
      <Image src={avatar} width={200} />
      <Title level={3}>{current}</Title>
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
