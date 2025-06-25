import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { buttonStyles } from '../../shared/myStyles/myStyles';

type PropsType = {
  list: Array<{ name: string; pathName: string }>;
};

const MainNav: React.FC<PropsType> = ({ list }) => {
  return (
    <div className="flex justify-center gap-2">
      {list.map((el, index) => (
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
    </div>
  );
};

export default MainNav;
