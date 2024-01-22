import { JogadorPayload } from "../interfaces/jogador";
import { client } from "./index";

export const cadastrarJogador = async (payload: JogadorPayload) =>
  await client.post(`/jogadores/`, payload);
