import React, { useState } from "react";
import { Button, Flex, List, Typography } from "antd";
import useFirebase from "../hooks/useFirebase";

interface Nominated {
  name: string;
  type: string;
  score: number;
  fun: number;
  hand: number;
  makeup: number;
  original: number;
  runway: number;
}

interface Category {
  label: string;
  evaluation: string;
  items?: Nominated[];
}

function Liderboard() {
  const [categories, setCategories] = useState<Category[]>();
  const { getAllCompetitors } = useFirebase();

  const getWinners = async () => {
    const all = await getAllCompetitors();
    all?.forEach((competitor) => setScore(competitor));

    const summary: Category[] = [
      {
        label: "Mejor de todos",
        evaluation: "score",
        items: all?.sort((a, b) => b.score - a.score),
      },
      {
        label: "Más divertido",
        evaluation: "fun",
        items: all?.sort((a, b) => b.fun - a.fun),
      },
    ];
    setCategories(summary);
  };

  const setScore = (competitor: any) => {
    const scores = ["fun", "hand", "makeup", "original", "runway"];
    competitor["score"] = scores.reduce((acc, score) => {
      competitor[score] = 0;
      competitor.scores.forEach((item: any) => {
        if (item.id !== 0) {
          competitor[score] += item.score[score];
        }
      });
      return acc + competitor[score];
    }, 0);
  };

  return (
    <Flex vertical justify="center" align="center" style={{ margin: "16px" }}>
      <Flex>
        <Button
          type="primary"
          onClick={getWinners}
          style={{ marginBottom: "16px" }}
        >
          Calcular
        </Button>
      </Flex>
      {categories?.map((category) => (
        <List
          bordered
          style={{ marginBottom: "16px" }}
          header={<b>{category.label}</b>}
          dataSource={category.items?.slice(0, 3)}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Title level={3}>{`#${index + 1} `}</Typography.Title>
              {`${item.name} `}
              <Typography.Text mark>{`[${
                item[category.evaluation as keyof Nominated]
              }]`}</Typography.Text>
            </List.Item>
          )}
        />
      ))}
    </Flex>
  );
}

export default Liderboard;
