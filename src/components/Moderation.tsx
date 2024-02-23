import React, { ChangeEvent } from "react";
import { Space, Image, Input, Select, Button, Typography, List } from "antd";
import { getAvatar, avatars } from "../utils/avatar-util";
import { useState } from "react";
import { useFirebase } from "../hooks/useFirebase";

const Moderation = () => {
  const { saveCompetitor, updateCompetitor, deleteCompetitor } = useFirebase();

  const [id, setId] = useState<string>();
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
    setId(undefined);
    setName(undefined);
    setType(undefined);
    setAvatar(getAvatar());
  };

  const select = (competitor: any) => {
    setId(competitor.id);
    setName(competitor.name);
    selectType(competitor.type);
    setAvatar(getAvatar(competitor.type));
  };

  const selectType = (avatarId?: string) => {
    if (avatarId) {
      setAvatar(getAvatar(avatarId));
      const avatar: any = avatars.find((av) => av.value === avatarId);
      setType(avatar.value);
    } else {
      setAvatar(getAvatar());
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const send = async () => {
    if (name && type) {
      const competitorId = await saveCompetitor(name, type);
      setId(competitorId!);
    }
  };

  const save = async () => {
    if (id) {
      await updateCompetitor(id, { name, type, status: "saved" });
      reset();
    }
  };

  const remove = async () => {
    if (id) {
      await deleteCompetitor(id);
      reset();
    }
  };

  return (
    <div style={{ margin: "16px" }}>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image src={avatar} width={200} />
        {id && <Typography.Text disabled>{id}</Typography.Text>}
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
            disabled={id !== undefined || (!id && (!name || !type))}
            onClick={send}
          >
            Enviar
          </Button>
          <Button disabled={!id} onClick={save}>
            Guardar
          </Button>
          <Button type="primary" danger disabled={!id} onClick={remove}>
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
};

export default Moderation;
