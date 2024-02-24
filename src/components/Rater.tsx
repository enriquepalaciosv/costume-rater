import React, { useCallback, useEffect, useState } from "react";
import { List, Space, Typography, Rate, Image, Flex, Spin } from "antd";
import { getAvatar } from "../utils/avatar-util";
import { useFirebase } from "../hooks/useFirebase";
import { v4 as uuidv4 } from "uuid";

interface Score {
  fun: number;
  original: number;
  hand: number;
  makeup: number;
  runway: number;
}

export const Rater: React.FC = () => {
  const [uniqueId, setUniqueId] = useState("");

  useEffect(() => {
    const storedUniqueId = localStorage.getItem("uniqueId");

    if (storedUniqueId) {
      setUniqueId(storedUniqueId);
    } else {
      const newUniqueId = uuidv4();
      setUniqueId(newUniqueId);
      localStorage.setItem("uniqueId", newUniqueId);
    }
  }, []);

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
      const dbItem = { id: uniqueId, score };

      const index = current.scores.findIndex(
        (item: any) => item.id === dbItem.id
      );

      if (index !== -1) {
        current.scores[index] = dbItem;
      } else {
        current.scores.push(dbItem);
      }

      updateCompetitor(current.id, current);
    },
    [score, current, uniqueId, updateCompetitor]
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
