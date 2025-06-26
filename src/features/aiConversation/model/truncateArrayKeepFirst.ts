export function truncateArrayKeepFirst<T>(arr: T[], maxLength: number): T[] {
  if (arr.length > maxLength) {
    const tail = arr.slice(arr.length - maxLength);
    return [arr[0], ...tail];
  }

  return arr;
}
