export type Jogador = {
  uuid: string;
  nome: string;
  altura: number;
  data_nasc: Date;
  cpf: string;
};

export type JogadorPayload = {
  nome: string;
  altura: number;
  data_nasc: string;
  cpf: string;
};
