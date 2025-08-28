import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { buttonStyles } from '@/shared/myStyles/myStyles';
import { useTranslation } from 'react-i18next';

const MainNav: React.FC = () => {
  const { t } = useTranslation('common');

  const pages = {
    assistant: {
      name: t('pageNames.assistant'),
      pathName: '',
    },
    todo: {
      name: t('pageNames.myTasks'),
      pathName: 'todo',
    },
  } as const;

  type PageType = { name: string; pathName: (typeof pages)[keyof typeof pages]['pathName'] };
  const navList: PageType[] = [pages.assistant, pages.todo];

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
