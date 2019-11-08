import React from 'react';
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const NavbarLinks = () => {
   return (
      <React.Fragment>
      <Nav.Link>
         <NavLink  
            to="/"
            style={{color: "grey"}}>
            Home
         </NavLink>
      </Nav.Link>
      <Nav.Link>
         <NavLink 
            to="/packages"
            style={{color: "grey"}}>
            Packages
         </NavLink>
      </Nav.Link>
      <Nav.Link>
         <NavLink 
            to="/reports"
            style={{color: "grey"}}>
            Reports
         </NavLink>
      </Nav.Link>
      </React.Fragment>
   );
}

export default NavbarLinks;
