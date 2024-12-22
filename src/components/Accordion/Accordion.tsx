import { useState, useContext, createContext } from "react";

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
    <div className="flex" {...props}>
      <div className="flex flex-col max-w-3xl mx-auto px-11 py-[70px]">
        {children}
      </div>
    </div>
  );
};

export default Accordion;

Accordion.Title = function AccordionTitle({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className="text-4xl leading-tight mt-0 mb-2 text-black text-center sm:text-3xl"
      {...props}
    >
      {children}
    </h1>
  );
};

Accordion.Frame = function AccordionFrame({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10" {...props}>
      {children}
    </div>
  );
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
      <div
        className="text-white mx-auto mb-2.5 max-w-[728px] w-full first:mt-12 last:mb-0"
        {...props}
      >
        {children}
      </div>
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
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between cursor-pointer mb-px text-2xl font-normal bg-[#303030] px-5 py-3 select-none items-center sm:text-base"
      {...props}
    >
      {children}
    </div>
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
    <div
      className={`text-2xl font-normal bg-[#303030] whitespace-pre-wrap select-none overflow-hidden transition-[max-height] duration-250 ease-in-out sm:text-base sm:leading-[22px] 
        ${isOpen ? "max-h-screen" : "max-h-0"}`}
      {...props}
    >
      <span className="block px-5 py-3">{children}</span>
    </div>
  );
};
