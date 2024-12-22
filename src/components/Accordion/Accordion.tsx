import { useState, useContext, createContext } from "react";
import {
  Container,
  Inner,
  Item,
  Body,
  Frame,
  Title,
  Header,
} from "./Accordion.styles";

interface AccordionContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AccordionContext = createContext<AccordionContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion = ({ children, ...props }: AccordionProps) => {
  return (
    <Container {...props}>
      <Inner>{children}</Inner>
    </Container>
  );
};

export default Accordion;

Accordion.Title = function AccordionTitle({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return <Title {...props}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return <Frame {...props}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AccordionContext.Provider value={{ isOpen, setIsOpen }}>
      <Item {...props}>{children}</Item>
    </AccordionContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen } = useContext(AccordionContext);
  return (
    <Header
      onClick={() => {
        console.log("clicked");
        setIsOpen(!isOpen);
      }}
      {...props}
    >
      {children}
    </Header>
  );
};

Accordion.Body = function AccordionBody({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useContext(AccordionContext);
  return (
    <Body className={isOpen ? "open" : "closed"} {...props}>
      <span>{children}</span>
    </Body>
  );
};
