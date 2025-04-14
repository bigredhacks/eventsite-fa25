import { SectionProps } from "./SectionProps";

const About: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={`min-h-screen h-[100vh] 
        flex items-center justify-end text-right
        bg-transparent
        p-12
         ${className ?? ""}`}
    >
      <div className="w-full md:mr-18 font-jersey10 text-right">
        <h2 className="text-6xl text-yellow2">ABOUT</h2>
        <p className="w-full md:w-1/2 ml-auto text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          viverra nisl vel est consectetur tempor. Sed nec lacus ligula.
          Pellentesque ut ligula massa. Suspendisse ut dictum odio.
        </p>
      </div>
    </section>
  );
};

export default About;
