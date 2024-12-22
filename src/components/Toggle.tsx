import { createContext, useContext, useState, useCallback } from "react";
import { Switch } from "./Switch/Switch";

interface ToggleContextType {
  on: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | null>(null);

function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("Toggle components must be used within a Toggle provider");
  }
  return context;
}

interface ToggleProps {
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  children: React.ReactNode;
}

export function Toggle({ defaultOn = false, onChange, children }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  
  const toggle = useCallback(() => {
    setOn(current => {
      const newValue = !current;
      onChange?.(newValue);
      return newValue;
    });
  }, [onChange]);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}



Toggle.On = function ToggleOn({ children }: { children: React.ReactNode }) {
  const { on } = useToggleContext();
  return on ? <>{children}</> : null;
};

Toggle.Off = function ToggleOff({ children }: { children: React.ReactNode }) {
  const { on } = useToggleContext();
  return on ? null : <>{children}</>;
};

Toggle.Button = function ToggleButton() {
  const { on, toggle } = useToggleContext();
  return <Switch on={on} onClick={toggle} />;
};

export default Toggle;
