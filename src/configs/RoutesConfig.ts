import LandingPage from "../pages/LandingPage";

export interface Rota {
  path: string;
  component: React.FC;
  exact: boolean;
  tipoUsuario: boolean;
}

const RoutesConfig: Array<Rota> = [
  {
    path: "/landing",
    component: LandingPage,
    exact: false,
    tipoUsuario: true,
  },
];

export default RoutesConfig;
