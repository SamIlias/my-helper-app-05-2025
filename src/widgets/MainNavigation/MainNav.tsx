import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { buttonStyles } from '@/shared/myStyles/myStyles';

const pages = {
  assistant: {
    // name: t('pageNames.weather'),
    name: 'Assistant',
    pathName: 'assistant',
  },
  todo: {
    // name: t('pageNames.todo'),
    name: 'My tasks',
    pathName: 'todo',
  },
  auth: {
    // name: t('pageNames.auth'),
    name: 'Auth',
    pathName: 'auth',
  },
} as const;
type PageType = { name: string; pathName: (typeof pages)[keyof typeof pages]['pathName'] };

const navList: PageType[] = [pages.assistant, pages.todo];

const MainNav: React.FC = () => {
  return (
    <>
      {navList.map((el, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            isActive ? buttonStyles.navActive : buttonStyles.navPassive
          }
          to={`/${el.pathName}`}
        >
          {el.name}
        </NavLink>
      ))}
    </>
  );
};

export default MainNav;
