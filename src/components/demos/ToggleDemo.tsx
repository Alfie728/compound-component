import Toggle from "../Toggle";

export function ToggleDemo() {
  return (
    <Toggle defaultOn={true} onChange={(on) => console.log(on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
} 