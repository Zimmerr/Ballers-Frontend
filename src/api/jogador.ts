import { JogadorPayload } from "../interfaces/jogador.interface";
import {
  ResponseJogador,
  ResponseJogadores,
} from "../interfaces/responses.interface";
import { client } from "./index";

export const getJogador = async (uuid: string): Promise<ResponseJogador> =>
  await client.get(`/jogadores/${uuid}/`);

export const getJogadores = async (): Promise<ResponseJogadores> =>
  await client.get(`/jogadores/`);

export const cadastrarJogador = async (payload: JogadorPayload) =>
  await client.post(`/jogadores/`, payload);

export const editarJogador = async (payload: JogadorPayload, uuid: string) =>
  await client.put(`/jogadores/${uuid}/`, payload);

export const deletarJogador = async (uuid: string) =>
  await client.delete(`/jogadores/${uuid}/`);
