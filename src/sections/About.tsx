import { SectionProps } from "./SectionProps";

const About: React.FC<SectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={`
        flex items-start justify-start text-left
        bg-transparent
        md:px-24 px-8
        md:py-24 py-6
        md:pt-60 pt-40
         ${className ?? ""}`}
    >
      <div className="w-full font-jersey10 text-left">
        {/* Title */}
        <h2 className="text-6xl text-yellow2 p-4">ABOUT</h2>
        {/* Blurb */}
        <div className="w-full md:w-7/11 mr-auto text-xl space-y-3 font-sans bg-purple3/50 p-6 rounded-lg ">
          <p>
            BigRed//Hacks is Cornell’s{" "}
            <span className="font-bold text-yellow1">
              largest student-run hackathon
            </span>
            , happening this September. It’s a 24-hour event where students come
            together to build{" "}
            <span className="font-bold text-yellow1">hardware</span> or{" "}
            <span className="font-bold text-yellow1">software</span> projects;
            whether that means making an app, designing a product, or just
            experimenting with something new. It is where{" "}
            <span className="font-bold text-yellow1">innovation</span> comes to
            life.
          </p>
          <p>
            Participants can work solo or in a team of up to four.{" "}
            <span className="font-bold text-yellow1">No experience needed</span>
            —we have workshops, mentors, and everything participants need to get
            started. There’s also $5,000+ in prizes, raffles, swag, and free
            food is served throughout the weekend.
          </p>
          <p>
            All majors and skill levels are welcome. It’s a{" "}
            <span className="font-bold text-yellow1">fun</span> space to learn
            something new, meet other builders, and make something cool in a
            short amount of time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
