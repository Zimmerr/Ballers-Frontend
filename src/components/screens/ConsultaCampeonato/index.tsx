import { useEffect, useState } from "react";
import { Campeonato } from "../../../interfaces/campeonato.interface";
import { Button, Space, Spin, Table } from "antd";
import { getCampeonatos } from "../../../api/campeonato";
import { NavLink } from "react-router-dom";
import { cadastroCampeonato } from "../../../configs/constants";

const ConsultaCampeonato = () => {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaCampeonatos = async () => {
    setCarregando(true);
    const response = await getCampeonatos();
    setCampeonatos(response.data);
    setCarregando(false);
  };

  useEffect(() => {
    carregaCampeonatos();
  }, []);

  return (
    <Spin spinning={carregando} tip="Carregando">
      <div>
        <div className="mb-3">
          <NavLink to={`/${cadastroCampeonato}`}>
            <Button type="primary">Cadastrar Campeonato</Button>
          </NavLink>
        </div>

        <Table
          dataSource={campeonatos}
          columns={[
            {
              title: "Nome",
              dataIndex: "nome",
              key: "nome",
            },
            {
              title: "Descrição",
              dataIndex: "descricao",
              key: "descricao",
            },
            {
              title: "Ações",
              key: "acoes",
              render: (data: Campeonato) => {
                return (
                  <Space size="middle">
                    <NavLink to={`/${cadastroCampeonato}?uuid=${data.uuid}`}>
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

export default ConsultaCampeonato;
