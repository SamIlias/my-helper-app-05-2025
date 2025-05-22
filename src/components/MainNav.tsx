import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { myStyles } from '../myStyles/myStyles.ts';

const navStyles = {
  active: `text-amber-500 shadow text-shadow-lg border border-solid rounded px-2 ${myStyles.bgGrayBlur}`,
  navElement: `text-teal-600 text-shadow-lg px-2 ${myStyles.bgGrayBlur}`,
};

type PropsType = {
  list: Array<string>;
};

const MainNav: React.FC<PropsType> = ({ list }) => {
  return (
    <div className="flex justify-center gap-2">
      {list.map((el, index) => (
        <NavLink
          key={index}
          className={({ isActive }) => (isActive ? navStyles.active : navStyles.navElement)}
          to={`/${el}`}
        >
          {el}
        </NavLink>
      ))}
    </div>
  );
};

export default MainNav;
