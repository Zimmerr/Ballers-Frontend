import { useEffect, useState } from "react";
import { Jogador } from "../../../interfaces/jogador.interface";
import { App, Button, Popconfirm, Space, Spin, Table } from "antd";
import { deletarJogador, getJogadores } from "../../../api/jogador";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { cadastroJogador } from "../../../configs/constants";
import axios from "axios";

const ConsultaJogador = () => {
  const { message } = App.useApp();
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaJogadores = async () => {
    setCarregando(true);
    const response = await getJogadores();
    setJogadores(response.data);
    setCarregando(false);
  };

  useEffect(() => {
    carregaJogadores();
  }, []);

  const deletaJogador = async (uuid: string) => {
    try {
      const response = await deletarJogador(uuid);
      if (response.status === 200) {
        message.success("Jogador inativado com sucesso!");
        carregaJogadores();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error("Ocorreu um erro ao inativar Jogador!");
      }
    }
  };

  return (
    <Spin spinning={carregando} tip="Carregando">
      <div>
        <div className="mb-3">
          <NavLink to={`/${cadastroJogador}`}>
            <Button type="primary">Cadastrar Jogador</Button>
          </NavLink>
        </div>

        <Table
          dataSource={jogadores}
          columns={[
            {
              title: "Nome",
              dataIndex: "nome",
              key: "nome",
            },
            {
              title: "Altura",
              dataIndex: "altura",
              key: "altura",
              render: (alt) => {
                let x = (alt / 100).toLocaleString();
                return <>{`${x}m`}</>;
              },
            },
            {
              title: "Data de Nascimento",
              dataIndex: "data_nasc",
              key: "data_nasc",
              render: (data) => {
                return <>{dayjs(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</>;
              },
            },
            {
              title: "Ações",
              key: "acoes",
              render: (data: Jogador) => {
                return (
                  <Space size="middle">
                    <NavLink to={`/${cadastroJogador}?uuid=${data.uuid}`}>
                      <a>Editar</a>
                    </NavLink>

                    <Popconfirm
                      title="Inativar Jogador?"
                      description="Deseja inativar esse jogador?"
                      onConfirm={() => {
                        deletaJogador(data.uuid);
                      }}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <a>Deletar</a>
                    </Popconfirm>
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

export default ConsultaJogador;
