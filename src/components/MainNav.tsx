import * as React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

type PropsType = {
  list: Array<string>;
};

const MainNav: React.FC<PropsType> = ({ list }) => {
  return (
    <div className="text-center flex justify-center gap-3">
      {list.map((el, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            isActive ? 'activeElement border border-solid rounded px-2 ' : 'navElement'
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
