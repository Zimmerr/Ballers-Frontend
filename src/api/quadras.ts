import {
  ResponseQuadras,
  ResponseHorarios,
} from "../interfaces/responses.interface";
import { client } from "./index";

export const getQuadras = async (): Promise<ResponseQuadras> =>
  await client.get(`/quadras/`);

export const getHorarios = async (): Promise<ResponseHorarios> =>
  await client.get(`/horarios/`);
