export const textColors = {
  primary: 'text-black dark:text-white',
  main: 'text-stone-600 dark:text-stone-200',
  secondary: 'text-amber-900 dark:text-amber-500',
  link: 'text-amber-700 dark:text-stone-400 hover:text-amber-900 dark:hover:text-stone-300',
  formLabel: 'text-gray-700 dark:text-amber-500',
  highlight: 'text-amber-700 dark:text-amber-400',
  placeholder: 'text-stone-700 dark:text-stone-100',
};

export const buttonStyles = {
  main: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationActive: `text-stone-800 font-bold  bg-yellow-600 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationPassive: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  navActive: `${textColors.secondary} flex items-center justify-center font-bold w-full bg-stone-900/20 dark:bg-amber-500/10`,
  navPassive: `${textColors.secondary} flex items-center justify-center w-full justify-self-center hover:bg-stone-200/10 transition duration-800 ease-in-out `,
  close: `border place-self-center rounded-sm px-1 ${textColors.main} hover:bg-orange-800 hover:text-white cursor-pointer`,
};

export const borderColors = {
  primary: 'border-stone-500',
  formInput: 'border rounded border-gray-400 focus:border-yellow-600 outline-none',
};

export const mainLayoutColors = {
  tilesBackground: 'bg-stone-500/40',
};

export const pageTitleStyle = `${textColors.main} text-shadow-md font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl`;
