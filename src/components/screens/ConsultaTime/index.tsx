import { useEffect, useState } from "react";
import { Time } from "../../../interfaces/time.interface";
import { Button, Space, Spin, Table } from "antd";
import { getTimes } from "../../../api/time";
import { NavLink } from "react-router-dom";
import { cadastroTime } from "../../../configs/constants";

const ConsultaTime = () => {
  const [times, setTimes] = useState<Time[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaTimes = async () => {
    setCarregando(true);
    const response = await getTimes();
    setTimes(response.data);
    setCarregando(false);
  };

  useEffect(() => {
    carregaTimes();
  }, []);

  return (
    <Spin spinning={carregando} tip="Carregando">
      <div>
        <div className="mb-3">
          <NavLink to={`/${cadastroTime}`}>
            <Button type="primary">Cadastrar Time</Button>
          </NavLink>
        </div>

        <Table
          dataSource={times}
          columns={[
            {
              title: "Abreviação",
              dataIndex: "abreviacao",
              key: "abreviacao",
            },
            {
              title: "Nome",
              dataIndex: "nome",
              key: "nome",
            },
            {
              title: "Apelido",
              dataIndex: "apelido",
              key: "apelido",
            },
            {
              title: "Ações",
              key: "acoes",
              render: (data: Time) => {
                return (
                  <Space size="middle">
                    <NavLink to={`/${cadastroTime}?uuid=${data.uuid}`}>
                      <a>Editar</a>
                    </NavLink>
                  </Space>
                );
              },
            },
          ]}
        />
      </div>
    </Spin>
  );
};

export default ConsultaTime;
