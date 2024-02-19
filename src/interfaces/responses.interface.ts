import { Jogador } from "./jogador.interface";
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
