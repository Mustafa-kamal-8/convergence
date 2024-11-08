export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center ">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">401</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you're unauthorized.
        </p>
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">Login then come back</p>
      </div>
    </div>
  );
}
