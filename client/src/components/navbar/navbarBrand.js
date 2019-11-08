import React from 'react';
import shipdLogo from '../../shipd.svg'
import { Navbar } from 'react-bootstrap'

const navbarBrand = () => {
   return (
      <Navbar.Brand href="#home">
         <img
         alt=""
         src={shipdLogo}
         width="45"
         height="45"
         className="d-inline-block align-center"
         />
         {`       Shipd`}
      </Navbar.Brand>
   );
}

export default navbarBrand;
