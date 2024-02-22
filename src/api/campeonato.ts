import { CampeonatoPayload } from "../interfaces/campeonato.interface";
import {
  ResponseCampeonato,
  ResponseCampeonatos,
} from "../interfaces/responses.interface";
import { client } from "./index";

export const getCampeonato = async (
  uuid: string,
): Promise<ResponseCampeonato> => await client.get(`/campeonatos/${uuid}/`);

export const getCampeonatos = async (): Promise<ResponseCampeonatos> =>
  await client.get(`/campeonatos/`);

export const cadastrarCampeonato = async (payload: CampeonatoPayload) =>
  await client.post(`/campeonatos/`, payload);

export const editarCampeonato = async (
  payload: CampeonatoPayload,
  uuid: string,
) => await client.put(`/campeonatos/${uuid}/`, payload);
