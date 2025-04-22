import { SectionProps } from "./SectionProps";

const Schedule: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="schedule"
      className={`min-h-screen h-[100vh] 
        flex items-center justify-center 
        bg-transparent
        px-24
         ${className ?? ""}`}
    >
      <div className="w-full md:mr-18 font-jersey10 text-right">
        <h2 className="text-6xl text-yellow2">SCHEDULE</h2>
        <p className="w-full md:w-1/2 ml-auto text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </section>
  );
};

export default Schedule;
