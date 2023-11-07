import Landing from "../components/screens/Landing";

export interface Rota {
  path: string;
  component: React.FC;
  exact: boolean;
  tipoUsuario: boolean;
}

const RoutesConfig: Array<Rota> = [
  {
    path: "/landing",
    component: Landing,
    exact: false,
    tipoUsuario: true,
  },
];

export default RoutesConfig;
