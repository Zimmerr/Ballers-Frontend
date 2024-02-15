import { Jogador } from "./jogador.interface";

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
