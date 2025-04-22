import { SectionProps } from "./SectionProps";
import Accordion from "../components/Accordian";
import { faqData } from "../config/config";

const FAQ: React.FC<SectionProps> = ({ className }) => {
  const accordionItems = faqData.map(item => ({
    title: item.question,
    content: item.answer
  }));

  return (
    <section
      id="faq"
      className={`min-h-screen h-[100vh] 
        flex items-center justify-center 
        bg-transparent
        px-24
         ${className ?? ""}`}
    >
      <div className="w-full md:ml-18 font-jersey10 text-left">
        <h2 className="text-6xl text-yellow2">FAQ</h2>
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
};

export default FAQ;
