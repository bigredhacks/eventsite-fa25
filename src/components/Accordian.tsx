import React, { useState } from "react";
import Arrow from "@/assets/arrow.png";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="bg-grey1/50 text-2xl rounded-lg p-6 mt-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-3xl text-yellow1">{item.title}</h3>
            <button>
              <img
                src={Arrow}
                alt="arrow"
                // duration determines speed of arrow rotation
                className={`w-8 h-8 transition-transform duration-500 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div
            // duration determines speed of content display toggle
            className={`overflow-hidden duration-500 ${
              activeIndex === index ? "max-h-96" : "max-h-0"
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
