import {
  App,
  Button,
  Checkbox,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Spin,
} from "antd";
import { getTimes } from "../../../api/time";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { consultaPartida } from "../../../configs/constants";
import { ReactNode, useEffect, useState } from "react";
import {
  cadastrarPartida,
  editarPartida,
  getPartida,
} from "../../../api/partida";
import { Partida, PartidaPayload } from "../../../interfaces/partida.interface";
import { getCampeonatos } from "../../../api/campeonato";
import { getHorarios, getQuadras } from "../../../api/quadras";
import dayjs from "dayjs";

type SelectOption = {
  value: string;
  label: ReactNode;
};

const CadastroPartida = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<Partida>({} as Partida);
  const [times, setTimes] = useState<SelectOption[]>([]);
  const [campeonatos, setCampeonatos] = useState<SelectOption[]>([]);
  const [horarios, setHorarios] = useState<SelectOption[]>([]);
  const [quadras, setQuadras] = useState<SelectOption[]>([]);
  const [finalizada, setFinalizada] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaPartida = async (uuid: string) => {
    const response = await getPartida(uuid);
    setInitialValues(response.data);
  };

  const carregaTimes = async () => {
    setCarregando(true);
    const response = await getTimes();
    let options = response.data.map((time) => ({
      value: time.uuid,
      label: (
        <span>
          {time.abreviacao} - {time.nome}
        </span>
      ),
    }));
    setTimes(options);
    setCarregando(false);
  };

  const carregaCampeonatos = async () => {
    setCarregando(true);
    const response = await getCampeonatos();
    let options = response.data.map((camp) => ({
      value: camp.uuid,
      label: <span>{camp.nome}</span>,
    }));
    setCampeonatos(options);
    setCarregando(false);
  };

  const carregaQuadras = async () => {
    setCarregando(true);
    const response = await getQuadras();
    let options = response.data.map((camp) => ({
      value: camp.uuid,
      label: <span>{camp.nome}</span>,
    }));
    setQuadras(options);
    setCarregando(false);
  };

  const carregaHorarios = async () => {
    setCarregando(true);
    const response = await getHorarios();
    let options = response.data.map((camp) => ({
      value: camp.uuid,
      label: <span>{camp.hora}</span>,
    }));
    setHorarios(options);
    setCarregando(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    carregaTimes();
    carregaCampeonatos();
    carregaQuadras();
    carregaHorarios();
    if (uuid) {
      carregaPartida(uuid);
    }
  }, []);

  useEffect(() => {
    if (initialValues.uuid) {
      form.setFieldsValue({
        ...initialValues,
        data: dayjs(initialValues.data, "YYYY-MM-DD"),
        campeonato: initialValues.campeonato.uuid,
        time_casa: initialValues.time_casa.uuid,
        time_fora: initialValues.time_fora.uuid,
        horario: initialValues.horario.uuid,
        quadra: initialValues.quadra.uuid,
      });
      setFinalizada(initialValues.finalizada);
    }
  }, [initialValues]);

  const onFinish = async (values: PartidaPayload) => {
    const payload: PartidaPayload = {
      time_casa: values.time_casa,
      time_fora: values.time_fora,
      campeonato: values.campeonato,
      horario: values.horario,
      quadra: values.quadra,
      data: dayjs(values.data).format("YYYY-MM-DD"),
      finalizada: finalizada,
    };

    if (payload.finalizada) {
      payload.gols_casa = values.gols_casa;
      payload.gols_fora = values.gols_fora;
    }

    try {
      const response = initialValues.uuid
        ? await editarPartida(payload, initialValues.uuid)
        : await cadastrarPartida(payload);
      if (response.status === 200 || response.status === 201) {
        history.push(`${consultaPartida}`);
        message.success(
          `${initialValues.uuid ? "Editado" : "Cadastrado"} com sucesso!`,
        );
      } else {
        message.error("Ocorreu um erro no Cadastro!");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error("Ocorreu um erro no Cadastro!");
      }
    }
  };

  const validateMessages = {
    required: "${label} é obrigatório!",
  };

  return (
    <Spin spinning={carregando} tip="Carregando">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Form.Item<Partida>
          label="Data"
          name="data"
          rules={[{ required: true }]}
          wrapperCol={{ span: 6 }}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>

        <Form.Item<Partida>
          label="Horario"
          name="horario"
          rules={[{ required: true }]}
          wrapperCol={{ span: 5 }}
        >
          <Select options={horarios} />
        </Form.Item>

        <Form.Item<Partida>
          label="Quadra"
          name="quadra"
          rules={[{ required: true }]}
          wrapperCol={{ span: 5 }}
        >
          <Select options={quadras} />
        </Form.Item>

        <Form.Item<Partida>
          label="Time Casa"
          name="time_casa"
          rules={[{ required: true }]}
          wrapperCol={{ span: 7 }}
        >
          <Select options={times} />
        </Form.Item>

        <Form.Item<Partida>
          label="Time Fora"
          name="time_fora"
          rules={[{ required: true }]}
          wrapperCol={{ span: 7 }}
        >
          <Select options={times} />
        </Form.Item>

        <Form.Item<Partida>
          label="Campeonato"
          name="campeonato"
          rules={[{ required: true }]}
          wrapperCol={{ span: 7 }}
        >
          <Select options={campeonatos} />
        </Form.Item>

        <Form.Item<Partida>
          label="Partida Finalizada?"
          name="finalizada"
          wrapperCol={{ span: 8 }}
        >
          <Checkbox
            checked={finalizada}
            onChange={(e) => setFinalizada(e.target.checked)}
          >
            Sim, a partida já foi finalizada!
          </Checkbox>
        </Form.Item>

        {finalizada && (
          <>
            <Form.Item<Partida>
              label="Gols - Time Casa"
              name="gols_casa"
              rules={[{ required: true }]}
            >
              <InputNumber precision={0} />
            </Form.Item>
            <Form.Item<Partida>
              label="Gols - Time Fora"
              name="gols_fora"
              rules={[{ required: true }]}
            >
              <InputNumber precision={0} />
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {initialValues.uuid ? "Editar" : "Cadastrar"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CadastroPartida;
