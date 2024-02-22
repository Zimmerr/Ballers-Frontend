import { Time } from "./time.interface";

export type Campeonato = {
  uuid: string;
  nome: string;
  descricao: string;
  times: Time[];
};

export type CampeonatoPayload = {
  nome: string;
  descricao: string;
  times: string[];
};
