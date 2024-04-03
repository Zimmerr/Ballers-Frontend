import {
  CrownOutlined,
  HomeOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { ForwardRefExoticComponent } from "react";
import * as constants from "../../../configs/constants";

interface ItemMenu {
  titulo: string;
  url: string;
  icon: ForwardRefExoticComponent<Pick<AntdIconProps, any>>;
}
export const listMenu: ItemMenu[] = [
  {
    titulo: "Início",
    url: `/${constants.landing}`,
    icon: HomeOutlined,
  },
  {
    titulo: "Jogadores",
    url: `/${constants.consultaJogador}`,
    icon: UserOutlined,
  },
  {
    titulo: "Times",
    url: `/${constants.consultaTime}`,
    icon: TeamOutlined,
  },
  {
    titulo: "Campeonatos",
    url: `/${constants.consultaCampeonato}`,
    icon: TrophyOutlined,
  },
  {
    titulo: "Partidas",
    url: `/${constants.consultaPartida}`,
    icon: CrownOutlined,
  },

];
