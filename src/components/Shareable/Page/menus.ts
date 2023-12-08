import { TrophyOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { ForwardRefExoticComponent } from "react";

interface ItemMenu {
  titulo: string;
  icon: ForwardRefExoticComponent<Pick<AntdIconProps, any>>;
}
export const listMenu: ItemMenu[] = [
  {
    titulo: "Campeonatos",
    icon: TrophyOutlined,
  },
];
