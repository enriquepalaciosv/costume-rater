import React, { ChangeEvent, useEffect, useCallback } from "react";
import {
  Space,
  Image,
  Input,
  Select,
  Button,
  Typography,
  List,
  Popconfirm,
} from "antd";
import { getAvatar, avatars } from "../utils/avatar-util";
import { useState } from "react";
import { useFirebase } from "../hooks/useFirebase";

const Moderation = () => {
  const {
    saveCompetitor,
    updateCompetitor,
    deleteCompetitor,
    getAllCompetitors,
  } = useFirebase();

  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [avatar, setAvatar] = useState(getAvatar());
  const [competitors, setCompetitors] = useState<any[]>();

  const loadCompetitors = useCallback(async () => {
    const all = await getAllCompetitors();
    setCompetitors(all);
  }, [getAllCompetitors]);

  useEffect(() => {
    loadCompetitors();
  }, [loadCompetitors]);

  const reset = () => {
    setId(undefined);
    setName(undefined);
    setType(undefined);
    setStatus(undefined);
    setAvatar(getAvatar());
  };

  const select = (competitor: any) => {
    setId(competitor.id);
    setName(competitor.name);
    selectType(competitor.type);
    setStatus(competitor.status);
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
          <Popconfirm
            title="Calcular el puntaje"
            description="¿Seguro?"
            onConfirm={save}
            okText="Si"
            cancelText="No"
          >
            <Button disabled={!id || status === "saved"}>Guardar</Button>
          </Popconfirm>

          <Popconfirm
            title="Eliminar el registro"
            description="¿Seguro?"
            onConfirm={remove}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger disabled={!id}>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      </Space>

      <List
        style={{ marginTop: "64px" }}
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
