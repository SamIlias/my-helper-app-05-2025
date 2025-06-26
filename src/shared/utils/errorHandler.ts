export const normalizeError = (err: unknown) => {
  return err instanceof Error ? err.message : String(err);
};
