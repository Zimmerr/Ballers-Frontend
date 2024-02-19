export type Jogador = {
  uuid: string;
  nome: string;
  altura: number;
  data_nasc: Date;
  cpf: string;
};

export type JogadorTransfer = {
  nome: string;
  cpf: string;
  key: string;
};

export type JogadorPayload = {
  nome: string;
  altura: number;
  data_nasc: string;
  cpf: string;
};
