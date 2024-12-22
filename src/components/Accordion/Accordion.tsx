import { useState, useContext, createContext, useId } from "react";
import { cn } from "../../util";

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}

interface ItemContextType {
  id: string;
  isOpen: boolean;
}

const ItemContext = createContext<ItemContextType | null>(null);

function useItemContext() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("Accordion.Header/Body must be used within an Accordion.Item");
  }
  return context;
}

interface AccordionProps {
  children: React.ReactNode;
  defaultOpen?: string[];
  className?: string;
}

const Accordion = ({ children, defaultOpen = [], className, ...props }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("flex", className)} {...props}>
        <div className="flex flex-col max-w-3xl mx-auto px-11 py-[70px]">
          {children}
        </div>
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;

Accordion.Title = function AccordionTitle({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn("text-4xl leading-tight mt-0 mb-2 text-black text-center sm:text-3xl", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

Accordion.Frame = function AccordionFrame({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10", className)} {...props}>
      {children}
    </div>
  );
};

Accordion.Item = function AccordionItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { openItems } = useAccordionContext();
  const id = useId();
  const isOpen = openItems.has(id);

  return (
    <ItemContext.Provider value={{ id, isOpen }}>
      <div
        className={cn(
          "text-white mx-auto mb-2.5 max-w-[728px] w-full first:mt-12 last:mb-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { id, isOpen } = useItemContext();
  const { toggleItem } = useAccordionContext();

  return (
    <h3>
      <button
        onClick={() => toggleItem(id)}
        className={cn(
          "flex w-full justify-between cursor-pointer mb-px text-2xl font-normal bg-[#303030] px-5 py-3 select-none items-center sm:text-base",
          className
        )}
        aria-expanded={isOpen}
        aria-controls={`section-${id}`}
        id={`header-${id}`}
        type="button"
        {...props}
      >
        {children}
      </button>
    </h3>
  );
};

Accordion.Body = function AccordionBody({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { id, isOpen } = useItemContext();

  return (
    <div
      id={`section-${id}`}
      aria-labelledby={`header-${id}`}
      role="region"
      className={cn(
        "text-2xl font-normal bg-[#303030] whitespace-pre-wrap select-none overflow-hidden transition-[max-height] duration-250 ease-in-out sm:text-base sm:leading-[22px]",
        isOpen ? "max-h-screen" : "max-h-0",
        className
      )}
      {...props}
    >
      <span className="block px-5 py-3">{children}</span>
    </div>
  );
};
