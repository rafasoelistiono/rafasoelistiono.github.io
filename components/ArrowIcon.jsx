export default function ArrowIcon({ className = "", title }) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M13.6 49.2 43.4 19.4H21.2V10h38.4v38.4h-9.4V26L20.2 56 13.6 49.2Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
