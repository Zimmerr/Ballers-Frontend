import { Campeonato } from "./campeonato.interface";
import { Jogador } from "./jogador.interface";
import { Partida } from "./partida.interface";
import { Time } from "./time.interface";

export interface ResponseInterface {
  data: Object;
  status: number;
}

export interface ResponseJogador extends ResponseInterface {
  data: Jogador;
}

export interface ResponseJogadores extends ResponseInterface {
  data: Jogador[];
}

export interface ResponseTime extends ResponseInterface {
  data: Time;
}

export interface ResponseTimes extends ResponseInterface {
  data: Time[];
}

export interface ResponseCampeonato extends ResponseInterface {
  data: Campeonato;
}

export interface ResponseCampeonatos extends ResponseInterface {
  data: Campeonato[];
}

export interface ResponsePartida extends ResponseInterface {
  data: Partida;
}

export interface ResponsePartidas extends ResponseInterface {
  data: Partida[];
}
