import { TimePayload } from "../interfaces/time.interface";
import { ResponseTime, ResponseTimes } from "../interfaces/responses.interface";
import { client } from "./index";

export const getTime = async (uuid: string): Promise<ResponseTime> =>
  await client.get(`/times/${uuid}/`);

export const getTimes = async (): Promise<ResponseTimes> =>
  await client.get(`/times/`);

export const cadastrarTime = async (payload: TimePayload) =>
  await client.post(`/times/`, payload);

export const editarTime = async (payload: TimePayload, uuid: string) =>
  await client.put(`/times/${uuid}/`, payload);
