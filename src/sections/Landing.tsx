interface LandingProps {
  opacity: number;
}

const Landing: React.FC<LandingProps> = ({ opacity }) => {
  return (
    <div className="h-[150vh] bg-purple2">
      <div
        className="h-[100vh] fixed flex items-end justify-start p-12"
        style={{ opacity }}
      >
        <div className="mb-12 ml-12">
          <h2 className="text-9xl font-jersey10 text-yellow1">BigRed//</h2>
          <h2 className="text-9xl font-jersey10 text-yellow1">Hacks 2025</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
