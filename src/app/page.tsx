import CanvasModel from "./components/canvas";
import Customiser from "./components/pages/Customiser";
import Home from "./components/pages/Home";

export default function Main() {
  return (
    <main className="relative h-screen w-full overflow-hidden transition-all ease-in">
      <Home />
      <CanvasModel />
      <Customiser />
    </main>
  );
}
