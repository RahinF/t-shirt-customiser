import {
  CirclesThree,
  FileImage,
  IconProps,
  Palette,
  Robot,
  TShirt,
} from "@phosphor-icons/react";
import { ForwardRefExoticComponent } from "react";

const Tabs = ["colorpicker", "filepicker", "aipicker", "none"] as const;
export type EditorTabs = (typeof Tabs)[number];

interface Tab {
  name: EditorTabs;
  icon: ForwardRefExoticComponent<IconProps>;
}

type decalTypes = {
  [key in "logo" | "full"]: {
    stateProperty: string;
    filterTab: string;
  };
};

export const editorTabs: Tab[] = [
  {
    name: "colorpicker",
    icon: Palette,
  },
  {
    name: "filepicker",
    icon: FileImage,
  },
  {
    name: "aipicker",
    icon: Robot,
  },
];

export const filterTabs = [
  {
    name: "logoShirt",
    icon: CirclesThree,
  },
  {
    name: "stylishShirt",
    icon: TShirt,
  },
];

export const decalTypes: decalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
