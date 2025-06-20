export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getNameFromEmail = (email: string | null) => {
  if (!email) {
    return '';
  }
  const rawName = email.split('@')[0];
  return capitalize(rawName);
};

export const truncate = (s: string, size: number = 15): string => {
  if (size >= s.length) {
    return s;
  }
  return s.slice(0, size) + '...';
};
