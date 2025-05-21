import * as React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

type PropsType = {
  list: Array<string>;
};

const MainNav: React.FC<PropsType> = ({ list }) => {
  return (
    <div className="text-center flex justify-center gap-2">
      {list.map((el, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            isActive
              ? 'activeElement shadow text-shadow-lg border border-solid rounded px-2'
              : 'navElement text-shadow-lg px-2'
          }
          to={`/${el}`}
        >
          {el}
        </NavLink>
      ))}
    </div>
  );
};

export default MainNav;
