import WaveText from "../components/WaveText";
import { SectionProps } from "./SectionProps";

const Sponsors: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="sponsors"
      className={`h-[70vh] 
        flex items-start justify-center 
        bg-transparent
        md:px-24 px-8
        md:py-12 py-12
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="font-jersey10 flex flex-col items-center">
        <h2 className="text-6xl text-yellow2">SPONSORS</h2>
        <WaveText text="loading..." className="mt-24 text-7xl" />
      </div>
    </section>
  );
};

export default Sponsors;
