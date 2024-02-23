import React, { useCallback, useEffect, useState } from "react";
import { List, Space, Typography, Rate, Image, Flex, Spin } from "antd";
import { getAvatar } from "../utils/avatar-util";
import { useFirebase } from "../hooks/useFirebase";

export const Rater: React.FC = () => {
  const [current, setCurrent] = useState<any>();
  const [allCompetitors, setAllCompetitors] = useState<any[]>();
  const [avatar, setAvatar] = useState<string>();
  const { getAllCompetitors } = useFirebase();
  const data = ["Divertido", "Original", "A mano", "Maquillaje", "Pasarela"];

  const watchNew = (collection?: any[]) => {
    if (collection) {
      const found = collection?.find((el) => el.status === "new");
      setCurrent(found);
      setAvatar(getAvatar(found?.type));
    }
  };

  const loadCompetitors = useCallback(async () => {
    const all = await getAllCompetitors();
    if (all) {
      watchNew(all);
      setAllCompetitors(all);
    }
  }, [getAllCompetitors]);

  useEffect(() => {
    loadCompetitors();
  }, [loadCompetitors]);

  useEffect(() => {
    watchNew(allCompetitors);
  }, [allCompetitors]);

  if (!current) {
    return (
      <Flex align="center" gap="middle" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Image src={avatar} width={200} />
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        {current.name}
      </Typography.Title>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ marginRight: "8px", fontSize: "1.2rem" }}>
              {item}
            </Typography.Text>
            <Rate style={{ fontSize: "28px" }} />
          </List.Item>
        )}
      />
    </Space>
  );
};
