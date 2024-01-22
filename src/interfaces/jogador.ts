export type Jogador = {
  nome: string;
  altura: number;
  dataNasc: Date;
  cpf: string;
};

export type JogadorPayload = {
  nome: string;
  altura: number;
  data_nasc: string;
  cpf: string;
};
