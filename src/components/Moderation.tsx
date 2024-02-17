import React from "react";
import { Space, Image, Input, Select, Button } from "antd";
import { getAvatar } from "../utils/avatar-util";
import { Competitor } from "../types/Competitor";
import { useState } from "react";

function Moderation() {

  const [avatar, setAvatar] = useState(getAvatar());

  const items = [
    {
      value: Competitor.AdultFemale,
      label: "Adulto mujer",
    },
    {
      value: Competitor.AdultMale,
      label: "Adulto varón",
    },
    {
      value: Competitor.YoungFemale,
      label: "Joven mujer",
    },
    {
      value: Competitor.YoungMale,
      label: "Joven varón",
    },
    {
      value: Competitor.Boy,
      label: "Niño",
    },
    {
      value: Competitor.Girl,
      label: "Niña",
    },
    {
      value: Competitor.Group,
      label: "Grupo",
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'center' }}>
      <Image src={avatar} width={200} />
      <Select style={{ width: '250px' }} placeholder="Tipo" options={items} onChange={(item) => setAvatar(getAvatar(item))} />
      <Input style={{ width: '250px' }} placeholder="Nombre" />
      <Button>Enviar</Button>
      <Button>Guardar</Button>
      <Button>Eliminar</Button>
    </Space>

  );
}

export default Moderation;
