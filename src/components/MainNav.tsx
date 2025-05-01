import * as React from "react";
import { NavLink} from "react-router-dom";
import '../App.css'

type PropsType = {
    list: Array<string>
}

const MainNav: React.FC<PropsType> = ({list}) => {
    return (
       <div className="main-nav">
           {list.map(el => (<NavLink className={({ isActive }) =>
               isActive ? "activeElement" : "navElement"} to={`/${el}`}>{el}</NavLink>))}
       </div>
    )
}

export default MainNav;