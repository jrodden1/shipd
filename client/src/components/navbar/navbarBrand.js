import React from 'react';
import shipdLogo from '../../shipd.svg'
import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const navbarBrand = () => {
   return (
      <NavLink to="/">
         <Navbar.Brand>
            <img
            alt=""
            src={shipdLogo}
            width="45"
            height="45"
            className="d-inline-block align-center"
            />
            {`       Shipd`}
         </Navbar.Brand>
      </NavLink>
   );
}

export default navbarBrand;
