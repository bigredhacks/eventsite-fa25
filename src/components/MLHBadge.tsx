const MLHBadge: React.FC = () => {
  return (
    <div className="relative">
      <a
        id="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=gray"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-3.5 w-[10%] max-w-[100px] min-w-[60px] z-[100]"
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
