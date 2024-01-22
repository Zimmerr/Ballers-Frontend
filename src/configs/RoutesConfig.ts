import CadastroJogadorPage from "../pages/CadastroJogadorPage";
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
];

export default RoutesConfig;
