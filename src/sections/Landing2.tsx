interface LandingProps {
  progress: number;
}

const Landing: React.FC<LandingProps> = ({ progress }) => {
  return (
    <>
      <div className="h-[100vh] flex items-end justify-start p-12">
        <div className="mb-12 ml-12 md:text-9xl text-8xl">
          <h2 className="font-jersey10 text-yellow1">Home</h2>
          <h2 className="font-jersey10 text-yellow1">Page</h2>
        </div>
      </div>
    </>
  );
};

export default Landing;
