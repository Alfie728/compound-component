import { ToggleDemo } from "./components/demos/ToggleDemo";
import { AccordionDemo } from "./components/demos/AccordionDemo";
import AccordionDemo2 from "./components/demos/RadixAccordionDemo";
function App() {
  return (
    <main className="bg-slate-300 flex flex-col items-center justify-center h-screen">
      {/* <ToggleDemo /> */}
      {/* <AccordionDemo /> */}
      <AccordionDemo2 />
    </main>
  );
}

export default App;
