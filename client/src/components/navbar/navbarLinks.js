import React from 'react';
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

//Functional Component that displays the navbar links
const NavbarLinks = () => {
   return (
      <React.Fragment>
      <Nav.Link as="div">
         <NavLink  
            to="/"
            style={{color: "grey"}}>
            Home
         </NavLink>
      </Nav.Link>
      <Nav.Link as="div">
         <NavLink 
            to="/packages"
            style={{color: "grey"}}>
            Packages
         </NavLink>
      </Nav.Link>
      <Nav.Link as="div">
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
