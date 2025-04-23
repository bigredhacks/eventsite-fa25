import { SectionProps } from "./SectionProps";

const About: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={`min-h-screen h-[100vh] 
        flex items-center justify-end text-right
        bg-transparent
        px-24
        py-12
         ${className ?? ""}`}
    >
      <div className="w-full md:mr-18 font-jersey10 text-right space-y-4">
        {/* Title */}
        <h2 className="text-6xl text-yellow2">ABOUT</h2>
        {/* Blurb */}
        <div className="md:w-1/2 ml-auto text-2xl space-y-3">
          <p>
            BigRed//Hacks is Cornell’s largest student-run hackathon, happening
            this September. It’s a 24-hour event where students come together to
            build hardware or software projects; whether that means making an
            app, designing a product, or just experimenting with something new.
            It is where innovation comes to life.
          </p>
          <p>
            Participants can work solo or in a team of up to four. No experience
            needed—we have workshops, mentors, and everything participants need
            to get started. There’s also $5,000+ in prizes, raffles, swag, and
            free food is served throughout the weekend.
          </p>
          <p>
            All majors and skill levels are welcome. It’s a fun space to learn
            something new, meet other builders, and make something cool in a
            short amount of time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
