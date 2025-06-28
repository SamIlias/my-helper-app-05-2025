import { useErrorBoundary } from 'react-error-boundary';
import { textColors } from '../myStyles/myStyles';

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className={`${textColors.main} m-3 flex flex-col gap-2 `}>
      Something went wrong: {error.message}
      <button
        className="border p-1 px-1 hover:text-yellow-400 cursor-pointer w-fit"
        onClick={resetBoundary}
      >
        Try again
      </button>
    </div>
  );
}
