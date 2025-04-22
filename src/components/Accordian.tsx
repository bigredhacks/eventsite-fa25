import React, { useState } from 'react';
import Arrow from "../assets/arrow.png";

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
                <div key={index} className="bg-grey1 opacity-67 w-full text-2xl rounded-lg p-8 mt-4">
                    <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="text-4xl text-yellow1">{item.title}</h3>
                        <button>
                            <img
                                src={Arrow}
                                alt="arrow"
                                className={`w-8 h-8 transform transition-transform duration-300 ${
                                    activeIndex === index ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    </div>
                    {activeIndex === index && (
                        <p className="mt-4">
                            {item.content}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;