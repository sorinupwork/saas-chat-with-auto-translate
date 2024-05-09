function LoadingSpinner() {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-200 animate-spin fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M50 2C74.1086 2 94.3164 22.2078 94.3164 46.3164"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 98C25.8914 98 5.68359 77.7922 5.68359 53.6836"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
