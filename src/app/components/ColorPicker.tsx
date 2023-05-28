import { FC } from "react";
import { ColorResult, SketchPicker } from "react-color";
import useStore from "../store/useStore";

const ColorPicker: FC = () => {
  const { snap, state } = useStore();

  const setColor = (color: ColorResult) => (state.color = color.hex);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => setColor(color)}
      />
    </div>
  );
};

export default ColorPicker;
