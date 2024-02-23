import React, { useCallback, useEffect, useState } from "react";
import { List, Space, Typography, Rate, Image, Flex, Spin } from "antd";
import { getAvatar } from "../utils/avatar-util";
import { useFirebase } from "../hooks/useFirebase";

interface Score {
  fun: number;
  original: number;
  hand: number;
  makeup: number;
  runway: number;
}

export const Rater: React.FC = () => {
  const [current, setCurrent] = useState<any>();
  const [allCompetitors, setAllCompetitors] = useState<any[]>();
  const [avatar, setAvatar] = useState<string>();
  const { getAllCompetitors, updateCompetitor } = useFirebase();
  const [score] = useState<Score>({
    fun: 0,
    original: 0,
    hand: 0,
    makeup: 0,
    runway: 0,
  });

  const categories = [
    { label: "Divertido", key: "fun" },
    { label: "Original", key: "original" },
    { label: "A mano", key: "hand" },
    { label: "Maquillaje", key: "makeup" },
    { label: "Pasarela", key: "runway" },
  ];

  const updateScore = useCallback(
    (value: number, category: string) => {
      score[category as keyof Score] = value;
      const dbItem = { id: "453451234", score };

      const index = current.scores.findIndex(
        (item: any) => item.id === dbItem.id
      );

      if (index !== -1) {
        // Object exists, replace it
        current.scores[index] = dbItem;
      } else {
        // Object doesn't exist, push it
        current.scores.push(dbItem);
      }

      updateCompetitor(current.id, current);
    },
    [score, current]
  );

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
      <Flex align="center" gap="middle" style={{ height: "90vh" }}>
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
        dataSource={categories}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text style={{ marginRight: "8px", fontSize: "1.2rem" }}>
              {item.label}
            </Typography.Text>
            <Rate
              style={{ fontSize: "28px" }}
              onChange={(value) => updateScore(value, item.key)}
            />
          </List.Item>
        )}
      />
    </Space>
  );
};
