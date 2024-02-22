import React, { ChangeEvent } from "react";
import { Space, Image, Input, Select, Button, Typography, List } from "antd";
import { getAvatar, avatars } from "../utils/avatar-util";
import { useState } from "react";

interface FirebaseCompetitor {
  id: string;
  name: string;
  type: string;
}

function Moderation() {
  const [current, setCurrent] = useState<FirebaseCompetitor>();
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();
  const [avatar, setAvatar] = useState(getAvatar());

  const competitors = [
    {
      id: "Id#1234567876543",
      name: "Ani - Bruja Escarlata",
      type: "YoungFemale",
    },
    {
      id: "Id#143353452543",
      name: "Enrique - Doctor Strange",
      type: "YoungMale",
    },
  ];

  const reset = () => {
    setCurrent(undefined);
    setName(undefined);
    setType(undefined);
    setAvatar(getAvatar());
  };

  const select = (competitor: FirebaseCompetitor) => {
    setCurrent(competitor);
    setName(competitor.name);
    setAvatar(getAvatar(competitor.type));
    selectType(competitor.type);
  };

  const selectType = (avatarId?: string) => {
    if (avatarId) {
      setAvatar(getAvatar(avatarId));
      const avatar: any = avatars.find((av) => av.value == avatarId);
      setType(avatar);
    } else {
      setAvatar(getAvatar());
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div style={{ margin: "16px" }}>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image src={avatar} width={200} />
        {current && <Typography.Text disabled>{current.id}</Typography.Text>}
        <Select
          style={{ width: "250px" }}
          placeholder="Tipo"
          options={avatars}
          onChange={(avatarId) => selectType(avatarId)}
          value={type}
        />
        <Input
          style={{ width: "250px" }}
          placeholder="Nombre"
          value={name}
          onChange={handleNameChange}
        />
        <Button type="dashed" onClick={reset}>
          Limpiar formulario
        </Button>
        <Space>
          <Button
            type="primary"
            disabled={
              current?.id != undefined || (!current && (!name || !type))
            }
            onClick={() =>
              setCurrent({ name: "name", type: "Group", id: "12345" })
            }
          >
            Enviar
          </Button>
          <Button disabled={!current}>Guardar</Button>
          <Button type="primary" danger disabled={!current}>
            Eliminar
          </Button>
        </Space>
      </Space>

      <List
        style={{ marginTop: "16px" }}
        bordered
        dataSource={competitors}
        renderItem={(item, index) => (
          <List.Item onClick={() => select(item)}>
            <Typography.Text>#{index + 1}</Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
}

export default Moderation;
