import { SectionProps } from "./SectionProps";

const FAQ: React.FC<SectionProps> = ({ className }) => {
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
        <p className="w-full md:w-1/2 mr-auto text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  );
};

export default FAQ;
