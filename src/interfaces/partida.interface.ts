import { Campeonato } from "./campeonato.interface";
import { Time } from "./time.interface";

export type Quadra = {
  uuid: string;
  nome: string;
};

export type Horario = {
  uuid: string;
  hora: string;
};

export type Partida = {
  uuid: string;
  campeonato: Campeonato;
  time_casa: Time;
  time_fora: Time;
  horario: Horario;
  quadra: Quadra;
  finalizada: boolean;
  gols_casa: number;
  gols_fora: number;
};

export type PartidaPayload = {
  nome: string;
  descricao: string;
  times: string[];
};
