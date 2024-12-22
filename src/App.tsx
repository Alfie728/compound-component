import Toggle from "./components/Toggle";

function App() {
  return (
    <Toggle 
      defaultOn={true}
      onChange={(on) => console.log(on)}
    >
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
}

export default App;
