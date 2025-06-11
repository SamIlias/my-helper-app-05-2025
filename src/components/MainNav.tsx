import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { myStyles } from '../myStyles/myStyles.ts';

const navStyles = {
  active: `${myStyles.textCol.main} text-shadow-lg border border-solid px-2 ${myStyles.bgGrayBlur}`,
  navElement: `${myStyles.textCol.secondary} text-shadow-lg px-2 ${myStyles.bgGrayLightBlur}`,
};

type PropsType = {
  list: Array<{name: string, pathName: string}>;
};

const MainNav: React.FC<PropsType> = ({ list }) => {
  return (
    <div className="flex justify-center gap-2">
      {list.map((el, index) => (
        <NavLink
          key={index}
          className={({ isActive }) => (isActive ? navStyles.active : navStyles.navElement)}
          to={`/${el.pathName}`}
        >
          {el.name}
        </NavLink>
      ))}
    </div>
  );
};

export default MainNav;
