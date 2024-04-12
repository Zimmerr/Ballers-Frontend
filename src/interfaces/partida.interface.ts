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
  data: string;
  horario: Horario;
  quadra: Quadra;
  finalizada: boolean;
  gols_casa: number;
  gols_fora: number;
};

export type PartidaPayload = {
  time_casa: string;
  time_fora: string;
  campeonato: string;
  horario: string;
  quadra: string;
  data: string;
  finalizada: boolean;
  gols_casa?: number;
  gols_fora?: number;
};
