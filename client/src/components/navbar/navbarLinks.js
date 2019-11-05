import React from 'react';
import { NavLink } from 'react-router-dom'

const NavbarLinks = () => {
   return (
      <React.Fragment>
         <NavLink 
            style={{ marginRight: '10px', marginLeft: '10px' }} 
            to="/">
            Home
         </NavLink>
         <NavLink 
            style={{ marginRight: '10px' }} 
            to="/packages">
            Packages
         </NavLink>
         <NavLink 
            style={{ marginRight: '10px' }} 
            to="/reports">
            Reports
         </NavLink>
      </React.Fragment>
   );
}

export default NavbarLinks;
