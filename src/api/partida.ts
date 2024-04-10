import { PartidaPayload } from "../interfaces/partida.interface";
import {
  ResponsePartida,
  ResponsePartidas,
} from "../interfaces/responses.interface";
import { client } from "./index";

export const getPartida = async (uuid: string): Promise<ResponsePartida> =>
  await client.get(`/partidas/${uuid}/`);

export const getPartidas = async (): Promise<ResponsePartidas> =>
  await client.get(`/partidas/`);

export const cadastrarPartida = async (payload: PartidaPayload) =>
  await client.post(`/partidas/`, payload);

export const editarPartida = async (payload: PartidaPayload, uuid: string) =>
  await client.put(`/partidas/${uuid}/`, payload);

export const deletarPartida = async (uuid: string) =>
  await client.delete(`/partidas/${uuid}/`);
