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
        label: "Más divertido",
        evaluation: "fun",
        items: all?.sort((a, b) => b.fun - a.fun),
      },
      {
        label: "Hecho a mano",
        evaluation: "hand",
        items: all?.sort((a, b) => b.hand - a.hand),
      },
      {
        label: "Mejor maquillaje",
        evaluation: "makeup",
        items: all?.sort((a, b) => b.makeup - a.makeup),
      },
      {
        label: "Más original",
        evaluation: "original",
        items: all?.sort((a, b) => b.original - a.original),
      },
      {
        label: "Mejor pasarela",
        evaluation: "runway",
        items: all?.sort((a, b) => b.runway - a.runway),
      },
      {
        label: "Mejor niño",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "Boy")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor niña",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "Girl")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor Jóven (mujer)",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "YoungFemale")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor Jóven (varón)",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "YoungMale")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor Adulto (varón)",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "AdultMale")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor Adulto (mujer)",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "AdultFemale")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor disfraz grupo",
        evaluation: "score",
        items: all
          ?.filter((it) => it.type === "Group")
          .sort((a, b) => b.score - a.score),
      },
      {
        label: "Mejor de todos",
        evaluation: "score",
        items: all?.sort((a, b) => b.score - a.score),
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
          key={category.label}
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
