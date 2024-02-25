import React, { useState } from "react";
import { Button, Flex, List, Typography } from "antd";
import useFirebase from "../hooks/useFirebase";

function Liderboard() {
  //   const categories = [
  //     { label: "Mejor de todos", evaluation: "score", items: [] },
  //     { label: "Más divertido", evaluation: "fun", items: [] },
  //   ];
  const [allCompetitors, setAllCompetitors] = useState<any[]>();

  const { getAllCompetitors } = useFirebase();

  const getWinners = async () => {
    const all = await getAllCompetitors();
    all?.forEach((competitor) => setScore(competitor));
    setAllCompetitors(all);
    //categories[0].items = all?.sort((a, b) => b.score - a.score).slice(0, 3)};
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
      <List
        bordered
        header={<b>Mejor de todos</b>}
        dataSource={allCompetitors
          ?.sort((a, b) => b.score - a.score)
          .slice(0, 3)}
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Title level={3}>{`#${index + 1} `}</Typography.Title>
            {`${item.name} `}
            <Typography.Text mark>{`[${item.score}]`}</Typography.Text>
          </List.Item>
        )}
      />
    </Flex>
  );
}

export default Liderboard;
