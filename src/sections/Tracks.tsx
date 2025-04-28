import { SectionProps } from "./SectionProps";

const Tracks: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="tracks"
      className={`min-h-screen h-[100vh] 
        flex items-start justify-center 
        bg-transparent
        md:px-24 px-8
        md:py-12 py-6
        md:pt-40 pt-40
         ${className ?? ""}`}
    >
      <div className="font-jersey10">
        <h2 className="text-6xl text-yellow2">TRACKS</h2>
      </div>
    </section>
  );
};

export default Tracks;
