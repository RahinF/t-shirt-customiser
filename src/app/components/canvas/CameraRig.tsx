import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { FC, ReactNode, useRef } from "react";
import { Group } from "three";
import useStore from "../../store/useStore";

interface Props {
  children: ReactNode;
}

const CameraRig: FC<Props> = ({ children }) => {
  const groupRef = useRef<Group>(null!);
  const { snap } = useStore();

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};

export default CameraRig;
