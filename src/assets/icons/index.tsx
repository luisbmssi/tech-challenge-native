import ArrowLeft from "./arrow-left";
import Home from "./home";
import Plus from "./plus";
import ThreeDotsHorizontal from "./three-dots-horizontal";
import { SvgProps } from "react-native-svg";

type IconProps = SvgProps & {
  name: keyof typeof icons
}

const icons = {
  home: Home,
  threeDotsHorizontal: ThreeDotsHorizontal,
  plus: Plus,
  arrowLeft: ArrowLeft
}

export default function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name]

  return (
    <IconComponent {...props} />
  )

}