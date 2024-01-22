import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import { MaskedInput } from "antd-mask-input";
import { Jogador, JogadorPayload } from "../../../interfaces/jogador";
import dayjs from "dayjs";
import { cadastrarJogador } from "../../../api/jogador";
import axios from "axios";

const CadastroJogador = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: Jogador) => {
    const payload: JogadorPayload = {
      nome: values.nome,
      altura: values.altura,
      cpf: values.cpf.replace(/\D+/g, ""),
      data_nasc: dayjs(values.dataNasc).format("YYYY-MM-DD"),
    };

    try {
      const response = await cadastrarJogador(payload);
      if (response.status === 201) {
        messageApi.success("Cadastrado com sucesso!");
      } else {
        messageApi.error("Ocorreu um erro no Cadastro!");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (
          e.response?.data.cpf[0] === "Jogador with this cpf already exists."
        ) {
          messageApi.warning("Já existe jogador com esse CPF!");
        } else {
          messageApi.error("Ocorreu um erro no Cadastro!");
        }
      }
    }
  };

  const validateMessages = {
    required: "${label} é obrigatório!",
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      {contextHolder}
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
        name="dataNasc"
        rules={[{ required: true }]}
      >
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CadastroJogador;
