import { SectionProps } from "./SectionProps";

const Tracks: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="tracks"
      className={`min-h-screen h-[100vh] 
        flex items-center justify-center 
        bg-transparent
         ${className ?? ""}`}
    >
      <div className="font-jersey10">
        <h2 className="text-6xl text-yellow2">TRACKS</h2>
      </div>
    </section>
  );
};

export default Tracks;
