export const textColors = {
  primary: 'text-black dark:text-white',
  main: 'text-stone-600 dark:text-amber-400',
  secondary: 'text-amber-900 dark:text-stone-300',
  link: 'text-amber-700 dark:text-stone-400 hover:text-amber-900 dark:hover:text-stone-300',
  formLabel: 'text-gray-700 dark:text-amber-500',
  highlight: 'text-amber-700 dark:text-amber-400',
};

export const buttonStyles = {
  main: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationActive: `text-stone-800 font-bold  bg-yellow-600 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationPassive: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  navActive: `${textColors.main} font-bold border border-solid rounded px-2 bg-stone-900/20 dark:bg-stone-900/10`,
  navPassive: `${textColors.main} px-2 bg-stone-900/10 dark:bg-stone-50/20 rounded`,
  close: `border place-self-center rounded-sm px-1 ${textColors.main} hover:bg-orange-800 hover:text-white cursor-pointer`,
};

export const borderColors = {
  primary: 'border-stone-500',
};

export const pageTitleStyle = `${textColors.main} text-shadow-md font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl`;
