import React from 'react';
import shipdLogo from '../../shipd.svg'

const navbarBrand = () => {
   return (
      <React.Fragment>
         <img src={shipdLogo} style={{width: 50, height: 50}} alt="Shipd Logo" /><span>Shipd</span>
      </React.Fragment>
   );
}

export default navbarBrand;
