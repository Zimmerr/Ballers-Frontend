import { App, Button, Checkbox, Form, InputNumber, Select, Spin } from "antd";
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
import {
  Partida,
  PartidaPayload,
} from "../../../interfaces/partida.interface";
import { getCampeonatos } from "../../../api/campeonato";

type SelectOption = {
  value: string;
  label: ReactNode;
}


const CadastroPartida = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<Partida>(
    {} as Partida,
  );
  const [times, setTimes] = useState<SelectOption[]>([]);
  const [campeonatos, setCampeonatos] = useState<SelectOption[]>([]);
  const [finalizada, setFinalizada] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);

  const carregaPartida = async (uuid: string) => {
    const response = await getPartida(uuid);
    setInitialValues(response.data);
  };

  const carregaTimes = async () => {
    setCarregando(true);
    const response = await getTimes();
    let options = response.data.map(time => ({
      value: time.uuid,
      label: <span>{time.abreviacao} - {time.nome}</span>
    }))
    setTimes(options);
    setCarregando(false);
  };

  const carregaCampeonatos = async () => {
    setCarregando(true);
    const response = await getCampeonatos();
    let options = response.data.map(camp => ({
      value: camp.uuid,
      label: <span>{camp.nome}</span>
    }))
    setCampeonatos(options);
    setCarregando(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    carregaTimes();
    carregaCampeonatos();
    if (uuid) {
      carregaPartida(uuid);
    }
  }, []);

  useEffect(() => {
    if (initialValues.uuid) {
      form.setFieldsValue({
        ...initialValues,

      });

    }
  }, [initialValues]);

  const onFinish = async (values: PartidaPayload) => {
    const payload: PartidaPayload = {
      nome: values.nome,
      descricao: values.descricao,
      times: values.times,
    };

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

        {/* TODO: horario, data e quadra */}
        
        <Form.Item<Partida>
          label="Time Casa"
          name="time_casa"
          rules={[{ required: true }]}
          wrapperCol={{ span: 6 }}
        >
          <Select options={times} />
        </Form.Item>

        <Form.Item<Partida>
          label="Time Fora"
          name="time_fora"
          rules={[{ required: true }]}
          wrapperCol={{ span: 6 }}
        >
          <Select options={times} />
        </Form.Item>

        <Form.Item<Partida>
          label="Campeonato"
          name="campeonato"
          rules={[{ required: true }]}
          wrapperCol={{ span: 6 }}
        >
          <Select options={campeonatos} />
        </Form.Item>

        <Form.Item<Partida>
          label="Partida Finalizada?"
          name="finalizada"
          wrapperCol={{ span: 6 }}
        >
          <Checkbox onChange={(e) => setFinalizada(e.target.checked)}>Sim, a partida já foi finalizada!</Checkbox>
        </Form.Item>

        {finalizada && <>
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
        </>}

        
        

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
