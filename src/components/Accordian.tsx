import React, { useState } from "react";

// Remove Arrow import since we're not using it anymore
interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndices(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg p-4 mt-4 font-sans">
          <div
            className="flex items-center cursor-pointer gap-4"
            onClick={() => toggleAccordion(index)}
          >
            <button className="text-2xl text-yellow1 w-8 h-8 flex items-center justify-center font-light transition-transform duration-300" style={{ transform: activeIndices.includes(index) ? 'rotate(180deg)' : 'rotate(-180deg)' }}>
              {activeIndices.includes(index) ? '−' : '+'}
            </button>
            <h3 className="text-xl text-yellow1 font-normal">{item.title}</h3>
          </div>
          <div
            className={`overflow-hidden duration-200 pl-12 pt-4 font-light text-[#B9B9B9] ${
              activeIndices.includes(index) ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="opacity-100">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
