import { SectionProps } from "./SectionProps";
import Accordion from "../components/Accordian";
import { faqData } from "../config/config";

const FAQ: React.FC<SectionProps> = ({ className }) => {
  const accordionItems = faqData.map((item) => ({
    title: item.question,
    content: item.answer,
  }));

  return (
    <section
      id="faq"
      className={`
        flex justify-start 
        bg-transparent
        md:px-32 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="w-full font-jersey10 text-left">
        {/* md:mx-18  */}
        <h2 className="text-6xl text-yellow2">FAQ</h2>
        <Accordion items={accordionItems} />
      </div>
    </section>
  );
};

export default FAQ;
