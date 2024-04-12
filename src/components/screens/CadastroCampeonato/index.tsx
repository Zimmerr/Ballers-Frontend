import { App, Button, Form, Input, Spin, TableColumnsType } from "antd";
import { getTimes } from "../../../api/time";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { consultaCampeonato } from "../../../configs/constants";
import { Key, useEffect, useState } from "react";
import { TimeTransfer } from "../../../interfaces/time.interface";
import TransferTimes from "./components/TransferTimes";
import {
  cadastrarCampeonato,
  editarCampeonato,
  getCampeonato,
} from "../../../api/campeonato";
import {
  Campeonato,
  CampeonatoPayload,
} from "../../../interfaces/campeonato.interface";

const leftTableColumns: TableColumnsType<TimeTransfer> = [
  {
    dataIndex: "nome",
    title: "Nome",
  },
  {
    dataIndex: "abreviacao",
    title: "Abreviação",
  },
];

const rightTableColumns: TableColumnsType<TimeTransfer> = [
  {
    dataIndex: "nome",
    title: "Nome",
  },
  {
    dataIndex: "abreviacao",
    title: "Abreviação",
  },
];

const CadastroCampeonato = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<Campeonato>(
    {} as Campeonato,
  );
  const [times, setTimes] = useState<TimeTransfer[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);

  const originTargetKeys = times
    .filter((item) => Number(item.key) % 3 > 1)
    .map((item) => item.key);

  const [targetKeys, setTargetKeys] = useState<Key[]>(originTargetKeys);

  const onChange = (nextTargetKeys: Key[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const carregaCampeonato = async (uuid: string) => {
    const response = await getCampeonato(uuid);
    setInitialValues(response.data);
  };

  const carregaTimes = async () => {
    setCarregando(true);
    const response = await getTimes();
    let listaTransfer: TimeTransfer[] = response.data.map((j) => ({
      nome: j.nome,
      abreviacao: j.abreviacao,
      key: j.uuid,
    }));
    setTimes(listaTransfer);
    setCarregando(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");

    carregaTimes();
    if (uuid) {
      carregaCampeonato(uuid);
    }
  }, []);

  useEffect(() => {
    if (initialValues.uuid) {
      form.setFieldsValue({
        ...initialValues,
        times: initialValues.times.map((j) => j.uuid),
      });

      setTargetKeys(initialValues.times.map((j) => j.uuid));
    }
  }, [initialValues]);

  const onFinish = async (values: CampeonatoPayload) => {
    const payload: CampeonatoPayload = {
      nome: values.nome,
      descricao: values.descricao,
      times: values.times,
    };

    try {
      const response = initialValues.uuid
        ? await editarCampeonato(payload, initialValues.uuid)
        : await cadastrarCampeonato(payload);
      if (response.status === 200 || response.status === 201) {
        history.push(`${consultaCampeonato}`);
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
        <Form.Item<Campeonato>
          label="Nome"
          name="nome"
          rules={[{ required: true }]}
          wrapperCol={{ span: 8 }}
        >
          <Input />
        </Form.Item>

        <Form.Item<Campeonato>
          label="Descrição"
          name="descricao"
          rules={[{ required: true }]}
          wrapperCol={{ span: 12 }}
        >
          <Input.TextArea rows={8} maxLength={1000} />
        </Form.Item>

        <Form.Item<Campeonato>
          label="Times"
          name="times"
          rules={[{ required: true }]}
        >
          <TransferTimes
            dataSource={times}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue: string, item: TimeTransfer) =>
              item.nome!.indexOf(inputValue) !== -1 ||
              item.abreviacao.indexOf(inputValue) !== -1
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

export default CadastroCampeonato;
