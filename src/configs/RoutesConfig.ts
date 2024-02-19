import CadastroJogadorPage from "../pages/CadastroJogadorPage";
import ConsultaJogadorPage from "../pages/ConsultaJogadorPage";
import CadastroTimePage from "../pages/CadastroTimePage";
import ConsultaTimePage from "../pages/ConsultaTimePage";
import LandingPage from "../pages/LandingPage";
import * as constants from "./constants";

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
];

export default RoutesConfig;
