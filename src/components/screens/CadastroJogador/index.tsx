import { App, Button, DatePicker, Form, Input, InputNumber } from "antd";
import { MaskedInput } from "antd-mask-input";
import { Jogador, JogadorPayload } from "../../../interfaces/jogador.interface";
import dayjs from "dayjs";
import {
  cadastrarJogador,
  editarJogador,
  getJogador,
} from "../../../api/jogador";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { consultaJogador } from "../../../configs/constants";
import { useEffect, useState } from "react";

const CadastroJogador = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<Jogador>({} as Jogador);

  const carregaJogador = async (uuid: string) => {
    const response = await getJogador(uuid);
    setInitialValues(response.data);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    if (uuid) {
      carregaJogador(uuid);
    }
  }, []);

  useEffect(() => {
    if (initialValues.uuid) {
      form.setFieldsValue({
        ...initialValues,
        data_nasc: dayjs(initialValues.data_nasc, "YYYY-MM-DD"),
      });
    }
  }, [initialValues]);

  const onFinish = async (values: Jogador) => {
    const payload: JogadorPayload = {
      nome: values.nome,
      altura: values.altura,
      cpf: values.cpf.replace(/\D+/g, ""),
      data_nasc: dayjs(values.data_nasc).format("YYYY-MM-DD"),
    };

    try {
      const response = initialValues.uuid
        ? await editarJogador(payload, initialValues.uuid)
        : await cadastrarJogador(payload);
      if (response.status === 200 || response.status === 201) {
        history.push(`${consultaJogador}`);
        message.success(
          `${initialValues.uuid ? "Editado" : "Cadastrado"} com sucesso!`,
        );
      } else {
        message.error("Ocorreu um erro no Cadastro!");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (
          e.response?.data.cpf[0] === "Jogador with this cpf already exists."
        ) {
          message.warning("Já existe jogador com esse CPF!");
        } else {
          message.error("Ocorreu um erro no Cadastro!");
        }
      }
    }
  };

  const validateMessages = {
    required: "${label} é obrigatório!",
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={initialValues}
    >
      <Form.Item<Jogador>
        label="Nome completo"
        name="nome"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Jogador>
        label="Altura (em centímetros)"
        name="altura"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item<Jogador> label="CPF" name="cpf" rules={[{ required: true }]}>
        <MaskedInput mask="000.000.000-00" />
      </Form.Item>

      <Form.Item<Jogador>
        label="Data de Nascimento"
        name="data_nasc"
        rules={[{ required: true }]}
      >
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {initialValues.uuid ? "Editar" : "Cadastrar"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CadastroJogador;
