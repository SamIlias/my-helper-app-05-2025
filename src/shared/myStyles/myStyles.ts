import { taskCategories } from '@/features/tasks/model/types';

export const textColors = {
  primary: 'text-black dark:text-white',
  main: 'text-stone-600 dark:text-stone-200',
  secondary: 'text-amber-900 dark:text-amber-500',
  link: 'text-amber-700 dark:text-stone-400 hover:text-amber-900 dark:hover:text-stone-300',
  formLabel: 'text-gray-700 dark:text-amber-500',
  highlight: 'text-amber-700 dark:text-amber-400',
  placeholder: 'text-stone-500 dark:text-stone-200',
  danger: `text-red-500`,
};

export const buttonStyles = {
  main: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationActive: `text-stone-800 font-bold  bg-yellow-600 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  paginationPassive: `text-orange-50 font-bold  bg-stone-900/40 dark:bg-white/70 dark:text-stone-800 px-1 hover:bg-yellow-400 hover:text-amber-900 cursor-pointer`,
  navActive: `${textColors.secondary} flex items-center justify-center font-bold w-full bg-stone-400/70 dark:bg-amber-500/10`,
  navPassive: `${textColors.secondary} flex items-center justify-center w-full justify-self-center hover:bg-amber-400/20 dark:hover:bg-stone-300/10 transition duration-800 ease-in-out `,
  close: `border place-self-center rounded-sm px-1 ${textColors.main} hover:bg-orange-800 hover:text-white cursor-pointer`,
  selectLanguage: `${textColors.secondary} text-sm cursor-pointer dark:hover:text-amber-300 hover:text-amber-700`,
  addTask: `p-2 bg-yellow-500 text-black rounded-md hover:bg-amber-700 hover:text-white transition duration-300`,
};

export const borderColors = {
  primary: 'border-stone-500',
  formInput: 'border rounded border-gray-400 focus:border-yellow-600 outline-none',
};

export const mainLayoutColors = {
  tilesBackground: 'dark:bg-stone-500/40 bg-stone-500/20',
  primaryBackground:
    'bg-gradient-to-r from-stone-200 from-5% via-stone-300 via-20% to-stone-400 to-90% dark:from-stone-500 dark:via-stone-600 dark:to-stone-700',
  contentBackground: 'bg-white dark:bg-stone-950',
};

export const promptFormStyle = {
  textarea: `bg-white dark:bg-stone-500/60 focus:outline-none focus:ring-1  focus:ring-amber-600/60 rounded-t-xl`,
  submitButton: (disabled: boolean) => {
    return `rounded text-md md:text-xl w-full h-fit py-1 shadow-lg ${
      !disabled
        ? 'bg-amber-500/80 text-stone-800 hover:bg-amber-700/80 transition cursor-pointer'
        : `bg-stone-900/20 dark:bg-stone-500/30 text-gray-500`
    }`;
  },
};

export const taskContainerStyle = `dark:bg-stone-500/40 bg-stone-500/20 transition shadow-lg duration-800 ease-in-out h-full `;
export const taskItemStyle = `bg-stone-200/40 dark:bg-stone-500/40 cursor-grab w-full hover:bg-amber-300/40 rounded-md p-2 transition shadow-lg duration-400 ease-in-out`;
export const taskContainerTitle = `${textColors.main} text-lg font-semibold text-center my-2`;

export const pageTitleStyle = `${textColors.main} text-shadow-md font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl`;

export const authPage = {
  background: `bg-stone-300 dark:bg-stone-900`,
  form: {
    mainStyle: `${textColors.main} shadow-md p-4 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mx-auto border mb-40 rounded `,
    input: `border p-2 w-full rounded focus:border-amber-500 outline-none`,
    signInButton: `w-full py-2 bg-lime-500/40  rounded hover:bg-lime-500 hover:text-stone-800 cursor-pointer`,
    signUpButton: `w-full py-2 bg-amber-500/40  rounded hover:bg-amber-500 hover:text-stone-800 cursor-pointer`,
    signInWithGoogleButton: `w-full py-2 bg-yellow-500/40  rounded hover:bg-yellow-500 hover:text-stone-800 cursor-pointer`,
  },
};

export const categoryColor = {
  [taskCategories.Work]: 'text-amber-600 dark:text-amber-300',
  [taskCategories.Default]: 'text-lime-700 dark:text-lime-300',
  [taskCategories.Urgent]: 'text-red-500 dark:text-red-400',
  [taskCategories.Daily]: 'text-cyan-600 dark:text-cyan-400',
  [taskCategories.Shopping]: 'text-violet-500 dark:text-violet-400',
} as const;
