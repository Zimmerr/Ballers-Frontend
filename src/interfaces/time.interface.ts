import { Jogador } from "./jogador.interface";

export type Time = {
  uuid: string;
  nome: string;
  abreviacao: string;
  apelido: string;
  jogadores: Jogador[];
};

export type TimePayload = {
  nome: string;
  abreviacao: string;
  apelido: string;
  jogadores: string[];
};
