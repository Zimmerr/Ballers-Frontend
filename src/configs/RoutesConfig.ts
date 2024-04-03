import CadastroJogadorPage from "../pages/CadastroJogadorPage";
import ConsultaJogadorPage from "../pages/ConsultaJogadorPage";
import CadastroTimePage from "../pages/CadastroTimePage";
import ConsultaTimePage from "../pages/ConsultaTimePage";
import LandingPage from "../pages/LandingPage";
import * as constants from "./constants";
import CadastroCampeonatoPage from "../pages/CadastroCampeonatoPage";
import ConsultaCampeonatoPage from "../pages/ConsultaCampeonatoPage";
import CadastroPartidaPage from "../pages/CadastroPartidaPage";
import ConsultaPartidaPage from "../pages/ConsultaPartidaPage";

export interface Rota {
  path: string;
  component: React.FC;
  exact: boolean;
  tipoUsuario: boolean;
}

const RoutesConfig: Array<Rota> = [
  {
    path: `/${constants.landing}`,
    component: LandingPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.cadastroJogador}`,
    component: CadastroJogadorPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.consultaJogador}`,
    component: ConsultaJogadorPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.cadastroTime}`,
    component: CadastroTimePage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.consultaTime}`,
    component: ConsultaTimePage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.cadastroCampeonato}`,
    component: CadastroCampeonatoPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.consultaCampeonato}`,
    component: ConsultaCampeonatoPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.consultaPartida}`,
    component: ConsultaPartidaPage,
    exact: false,
    tipoUsuario: true,
  },
  {
    path: `/${constants.cadastroPartida}`,
    component: CadastroPartidaPage,
    exact: false,
    tipoUsuario: true,
  },
];

export default RoutesConfig;
