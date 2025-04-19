export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Welcome to React SK Agents!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl">
        This is your modern Next.js + TypeScript + Tailwind CSS starter. Explore, build, and test your ideas with confidence!
      </p>
      <a
        href="https://github.com/DramisInfo/react-sk-agents"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow transition-colors"
      >
        View on GitHub
      </a>
    </div>
  );
}
