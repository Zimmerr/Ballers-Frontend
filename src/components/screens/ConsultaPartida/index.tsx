import { useEffect, useState } from "react";
import { Horario, Partida, Quadra } from "../../../interfaces/partida.interface";
import { App, Button, Popconfirm, Space, Spin, Table } from "antd";
import { deletarPartida, getPartidas } from "../../../api/partida";
import { NavLink } from "react-router-dom";
import { cadastroPartida } from "../../../configs/constants";
import dayjs from "dayjs";
import { Campeonato } from "../../../interfaces/campeonato.interface";
import axios from "axios";

const ConsultaPartida = () => {
  const { message } = App.useApp();
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaPartidas = async () => {
    setCarregando(true);
    const response = await getPartidas();
    setPartidas(response.data);
    setCarregando(false);
  };

  const deletaPartida = async (uuid: string) => {
    try {
      const response = await deletarPartida(uuid);
      if (response.status === 200) {
        message.success("Partida deletada com sucesso!");
        carregaPartidas();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error("Ocorreu um erro ao deletar a Partida!");
      }
    }
  };

  useEffect(() => {
    carregaPartidas();
  }, []);

  return (
    <Spin spinning={carregando} tip="Carregando">
      <div>
        <div className="mb-3">
          <NavLink to={`/${cadastroPartida}`}>
            <Button type="primary">Cadastrar Partida</Button>
          </NavLink>
        </div>

        <Table
          dataSource={partidas}
          columns={[
            {
              title: "Partida",
              key: "partida",
              render: (partida : Partida) => {
                return <>{`${partida.time_casa.abreviacao} ${partida.finalizada ? partida.gols_casa : ""} x ${partida.finalizada ? partida.gols_fora : ""} ${partida.time_fora.abreviacao}`}</>;
              },
            },
            {
              title: "Campeonato",
              dataIndex: "campeonato",
              key: "campeonato",
              render: (campeonato : Campeonato) => {
                return <>{campeonato.nome}</>;
              },
            },
            {
              title: "Data",
              dataIndex: "data",
              key: "data",
              render: (data) => {
                return <>{dayjs(data, "YYYY-MM-DD").format("DD/MM/YYYY")}</>;
              },
            },
            {
              title: "Horário",
              dataIndex: "horario",
              key: "horario",
              render: (horario : Horario) => {
                let hora = horario.hora.split(":")
                hora.pop()
                return <>{hora.join(":")}</>;
              },
            },
            {
              title: "Quadra",
              dataIndex: "quadra",
              key: "quadra",
              render: (quadra : Quadra) => {
                return <>{quadra.nome}</>;
              },
            },
            {
              title: "Ações",
              key: "acoes",
              render: (partida: Partida) => {
                return (
                  <Space size="middle">
                    <NavLink to={`/${cadastroPartida}?uuid=${partida.uuid}`}>
                      <a>Editar</a>
                    </NavLink>
                    {!partida.finalizada &&
                    <Popconfirm
                      title="Deletar partida?"
                      description="Deseja deletar essa partida? Essa ação é irreversível"
                      onConfirm={() => {
                        deletaPartida(partida.uuid);
                      }}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <a>Deletar</a>
                    </Popconfirm>
                    }
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

export default ConsultaPartida;
