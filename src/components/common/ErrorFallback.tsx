import { useErrorBoundary } from 'react-error-boundary';

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div>
      Something went wrong: {error.message}
      <button
        className="border p-1 px-1 hover:text-yellow-400 cursor-pointer"
        onClick={resetBoundary}
      >
        Try again
      </button>
    </div>
  );
}
