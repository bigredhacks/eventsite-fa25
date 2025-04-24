import { SectionProps } from "./SectionProps";

const Sponsors: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="sponsors"
      className={`min-h-screen h-[100vh] 
        flex items-start justify-center 
        bg-transparent
        md:px-24 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="font-jersey10">
        <h2 className="text-6xl text-yellow2">SPONSORS</h2>
      </div>
    </section>
  );
};

export default Sponsors;
