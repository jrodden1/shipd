import React from 'react';
import NavbarBrand from '../components/navbar/NavbarBrand'
import NavbarLinks from '../components/navbar/NavbarLinks'
import { Row, Col, Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

import shipdLogo from '../shipd.svg'
const NavbarContainer = () => {
   return (
      <React.Fragment>
         <Navbar bg="dark" variant="dark">
            <NavbarBrand />
            <Nav style={{color: "#FFFFFF"}} className="light">
               <NavbarLinks />
            </Nav>
         </Navbar>
      </React.Fragment>
   );
}

export default NavbarContainer;

// const NavbarContainer = () => {
//    return (
//       <Row>
//          <Col><NavbarBrand /></Col>   
//          <Col md="auto"></Col>
//          <Col><NavbarLinks /></Col>   
//       </Row>
//    );
// }

// export default NavbarContainer;


