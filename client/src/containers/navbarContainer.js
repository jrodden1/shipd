import React from 'react';
import NavbarBrand from '../components/navbar/NavbarBrand'
import NavbarLinks from '../components/navbar/NavbarLinks'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

//Functional container component - used to group the navbar components together.
const NavbarContainer = () => {
   return (
      <React.Fragment>
         <Navbar className="justify-content-center" bg="dark" variant="dark">
            <NavbarBrand />
            <Nav style={{color: "#FFFFFF"}} className="light">
               <NavbarLinks />
            </Nav>
         </Navbar>
      </React.Fragment>
   );
}

export default NavbarContainer;
