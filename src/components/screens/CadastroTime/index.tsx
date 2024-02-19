import { App, Button, Form, Input, Spin, TableColumnsType } from "antd";
import { Time, TimePayload } from "../../../interfaces/time.interface";
import { cadastrarTime, editarTime, getTime } from "../../../api/time";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { consultaTime } from "../../../configs/constants";
import { useEffect, useState } from "react";
import { JogadorTransfer } from "../../../interfaces/jogador.interface";
import { getJogadores } from "../../../api/jogador";
import TransferJogador from "./components/TransferJogador";

const leftTableColumns: TableColumnsType<JogadorTransfer> = [
  {
    dataIndex: "nome",
    title: "Nome",
  },
  {
    dataIndex: "cpf",
    title: "CPF",
  },
];

const rightTableColumns: TableColumnsType<JogadorTransfer> = [
  {
    dataIndex: "nome",
    title: "Nome",
  },
  {
    dataIndex: "cpf",
    title: "CPF",
  },
];

const CadastroTime = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<Time>({} as Time);
  const [jogadores, setJogadores] = useState<JogadorTransfer[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const originTargetKeys = jogadores
    .filter((item) => Number(item.key) % 3 > 1)
    .map((item) => item.key);

  const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const carregaTime = async (uuid: string) => {
    const response = await getTime(uuid);
    setInitialValues(response.data);
  };

  const carregaJogadores = async () => {
    setCarregando(true);
    const response = await getJogadores();
    let listaTransfer: JogadorTransfer[] = response.data.map((j) => ({
      nome: j.nome,
      cpf: j.cpf,
      key: j.uuid,
    }));
    setJogadores(listaTransfer);
    setCarregando(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    carregaJogadores();
    if (uuid) {
      carregaTime(uuid);
    }
  }, []);

  useEffect(() => {
    if (initialValues.uuid) {
      form.setFieldsValue({
        ...initialValues,
        jogadores: initialValues.jogadores.map((j) => j.uuid),
      });

      setTargetKeys(initialValues.jogadores.map((j) => j.uuid));
    }
  }, [initialValues]);

  const onFinish = async (values: TimePayload) => {
    const payload: TimePayload = {
      nome: values.nome,
      abreviacao: values.abreviacao,
      apelido: values.apelido,
      jogadores: values.jogadores,
    };

    try {
      const response = initialValues.uuid
        ? await editarTime(payload, initialValues.uuid)
        : await cadastrarTime(payload);
      if (response.status === 200 || response.status === 201) {
        history.push(`${consultaTime}`);
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
        <Form.Item<Time>
          label="Nome"
          name="nome"
          rules={[{ required: true }]}
          wrapperCol={{ span: 8 }}
        >
          <Input />
        </Form.Item>

        <Form.Item<Time>
          label="Abreviação"
          name="abreviacao"
          rules={[{ required: true }]}
          wrapperCol={{ span: 4 }}
        >
          <Input />
        </Form.Item>

        <Form.Item<Time>
          label="Apelido"
          name="apelido"
          rules={[{ required: true }]}
          wrapperCol={{ span: 8 }}
        >
          <Input />
        </Form.Item>

        <Form.Item<Time>
          label="Jogadores"
          name="jogadores"
          rules={[{ required: true }]}
        >
          <TransferJogador
            dataSource={jogadores}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue: string, item: JogadorTransfer) =>
              item.nome!.indexOf(inputValue) !== -1 ||
              item.cpf.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {initialValues.uuid ? "Editar" : "Cadastrar"}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CadastroTime;
