import { useSnapshot } from "valtio";
import state from "./";

const useStore = () => {
  const snap = useSnapshot(state);

  return { snap, state };
};

export default useStore;
