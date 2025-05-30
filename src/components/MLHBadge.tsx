const MLHBadge: React.FC = () => {
  return (
    <div className="relative">
      <a
        id="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=gray"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block fixed right-3.5 w-25 z-200"
      >
        <img
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-gray.svg"
          alt="Major League Hacking 2025 Hackathon Season"
          className="w-full"
        />
      </a>
    </div>
  );
};

export default MLHBadge;
