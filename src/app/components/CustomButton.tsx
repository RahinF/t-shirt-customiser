import clsx from "clsx";
import { FC } from "react";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";
import state from "../store";

type ButtonType = "outline" | "filled";

interface Props {
  type: ButtonType;
  title: string;
  handleClick?: () => void;
  customStyles?: string;
}

const CustomButton: FC<Props> = ({
  customStyles,
  handleClick,
  title,
  type,
}) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: ButtonType) => {
    switch (type) {
      case "filled":
        return {
          backgroundColor: snap.color,
          color: getContrastingColor(snap.color),
        };

      case "outline":
        return {
          borderWidth: "1px",
          borderColor: snap.color,
          color: snap.color,
        };

      default:
        break;
    }
  };

  return (
    <button
      className={clsx("`px-2 flex-1 rounded-md py-1.5", {
        [customStyles ?? ""]: true,
      })}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
