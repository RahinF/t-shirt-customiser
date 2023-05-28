import { IconProps } from "@phosphor-icons/react";
import clsx from "clsx";
import { FC, ForwardRefExoticComponent } from "react";
import useStore from "../store/useStore";

interface Props {
  tab: { name: string; icon: ForwardRefExoticComponent<IconProps> };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

const Tab: FC<Props> = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const { snap } = useStore();

  const Icon = tab.icon;

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };
  return (
    <button
      className={clsx(
        "flex h-14 w-14 cursor-pointer select-none items-center justify-center",
        {
          "glassmorphism rounded-full": isFilterTab,
          "rounded-4": !isFilterTab,
        }
      )}
      onClick={handleClick}
      style={activeStyles}
    >
      <Icon size={32} />
    </button>
  );
};

export default Tab;
